/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const router = require("express").Router();
const { Users, Category, Post, Comments } = require("../models");
const withAuth = require("../utils/auth");
const dic = require("../db/queries");

router.get('/comments', (req, res) =>{
     res.render('hero', {
          logged_in: req.session.logged_in,
          user_name: req.session.user_name,
     });
})

router.get('/', async (req, res) => {
     res.render('hero', {
          logged_in: req.session.logged_in,
          user_name: req.session.user_name,
     });
});

/**
 * Login route - user will be presented with login screen to 
 * enter their credentials
 */
router.get('/login', (req, res) => {
     if (req.session.logged_in) {
          res.redirect('/');
          return;
     }

     res.render('login');
});

/**
 * Article route - this will allow current user to create a new article entry, we are
 * getting the user id from the session.
 */
router.get('/create', withAuth, async (req, res) => {

     const dbData = await Category.findAll({
          attributes: { exclude: ['date_created'] },
          order: [["name", "ASC"]],
     });

     const categories = dbData.map((list) => list.get({ plain: true }));

     res.render('create', {
          categories,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id
     });
})

/**
 * Article route - this will display the articles existing in the system. It includes the 
 * category and comments information.
 */
router.get('/articles', withAuth, async (req, res) => {

     const sequelize = require('../config/connection');
     const { QueryTypes } = require('sequelize');
     const queryData = await sequelize.query(dic.sql.retrievesql, { type: QueryTypes.SELECT });

     const allLevels = await Post.findAll({ include: { all: true, nested: true }});
     const postRecords = allLevels.map((list) => list.get({ plain: true }));

     // const dbData = await Post.findAll({
     //      attributes: { exclude: ['date_edited'] },
     //      order: [["date_published", "DESC"]],
     //      include: [{ model: Category }, { model: Comments }],
     // });

     // const postRecords = dbData.map((list) => list.get({ plain: true }));

     res.render('articles', {
          postRecords,
          logged_in: req.session.logged_in,
          user_name: req.session.user_name,
     });
})

/**
 * Reply route - will offer the user the option to reply to selected
 * post. User must be signed before accessing this route
 */
router.get('/reply', withAuth, (req, res) => {

     res.render('reply', {
          logged_in: req.session.logged_in,
     });

})

/**
 * Register route - this will allow new users to register into our blog
 * database.
 */
router.get('/register', (req, res) => {
     if (req.session.logged_in) {
          alert(dic.messages.registernot);
          return;
     }

     res.render('register');
})

module.exports = router;
