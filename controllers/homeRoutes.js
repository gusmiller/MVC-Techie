/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const router = require('express').Router();
const { Users, Category, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");
const dic = require("../db/queries");

//****************************** LOGIN ROUTES **************************************/

/**
 * Root landing page - show presentation
 */
router.get('/', async (req, res) => {

     res.render('hero', {
          logged_in: req.session.logged_in,
          userid: req.session.user_id,
          is_admin: req.session.is_admin,
          user_name: req.session.user_name,
     });

});

/**
 * If a session exists, redirect the request to the website portal
 */
router.get('/login', (req, res) => {

     if (req.session.logged_in) {
          res.redirect('/');
          return;
     }

     res.render('login');
});

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

//*************************** END OF LOGIN ROUTES **********************************/

/**
 * Replies GET route retrieves just one record. This is used in the Reply view to present
 * information to the user. Condition: user must be registered and loged in.
 */
router.get('/filter/:id', withAuth, async (req, res) => {

     try {

          const getRecord = await Comments.findOne({
               where: { id: req.params.id },
               include: { all: true, nested: true },
          });

          // This will serialize the data prior to send to handlebar. Notice we are not using 
          // list as we don't have a bunch of records. Just one, but this object has connection 
          // with other tables that contain many.
          const dsData = getRecord.get({ plain: true });

          res.render('articles', {
               dsData,
               userid: req.session.user_id,
               logged_in: req.session.logged_in,
               user_name: req.session.user_name
          });

     } catch (error) {
          console.log(error.stack);
     }
})

/**
 * This home route is used to retrieve the categories to be used from the 
 * Posts Dashboard to filer the contents by category.
 */
router.get('/edit/category', withAuth, async (req, res) => {
     try {

          const [results, metadata] = await sequelize.query(dic.sql.getcategories);
          res.json(results);

     } catch (error) {
          res.status(400).json(error);
     }
})

/**
 * Reviews GET route retrieves just one record. This is used in the Edit handlebard view to present
 * information to the user. Condition: user must be registered and loged in.
 */
router.get('/articles/edit/:id', withAuth, async (req, res) => {

     try {

          const getRecord = await Posts.findOne({
               where: { id: req.params.id },
               include: { all: true, nested: true },
          });

          // This will serialize the data prior to send to handlebar. Notice we are not using 
          // list as we don't have a bunch of records. Just one, but this object has connection 
          // with other tables that contain many.
          const dsData = getRecord.get({ plain: true });

          res.render('edit', {
               dsData,
               logged_in: req.session.logged_in,
               userid: req.session.user_id,
               user_name: req.session.user_name
          });

     } catch (error) {
          console.log(error.stack);
     }
})

/**
 * Reviews GET route retrieves just one record. This is used in the Review view to present
 * information to the user. Condition: user must be registered and loged in.
 */
router.get('/reviews/:id', withAuth, async (req, res) => {

     try {
          const getRecord = await Posts.findOne({
               where: { id: req.params.id },
               include: { all: true, nested: true },
          });

          // This will serialize the data prior to send to handlebar. Notice we are not using 
          // list as we don't have a bunch of records. Just one, but this object has connection 
          // with other tables that contain many.
          const dsData = getRecord.get({ plain: true });

          res.render('reviews', {
               dsData,
               userid: req.session.user_id,
               logged_in: req.session.logged_in,
               user_name: req.session.user_name
          });

     } catch (error) {
          console.log(error.stack);
     }

})

/**
 * Article route - this will allow current user to create a new article entry, we are
 * getting the user id from the session.
 */
router.get('/create', withAuth, async (req, res) => {

     const dbData = await Category.findAll({
          attributes: { exclude: ['date_created'] },
          order: [["name", "ASC"]],
     });

     // This will serialize the data prior to send to handlebar. We are using list 
     // in this case as we are dealing with a bunch of records. 
     const categories = dbData.map((list) => list.get({ plain: true }));

     res.render('create', {
          categories,
          userid: req.session.user_id,
          logged_in: req.session.logged_in,
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

     const dsCat = await Category.findAll({
          attributes: { exclude: ['date_created'] },
          order: [["name", "ASC"]],
     });

     // This will serialize the data prior to send to handlebar. We are using list 
     // in this case as we are dealing with a bunch of records. 
     // The equivalent to .toList() in ASP.net
     const postCat = dsCat.map((list) => list.get({ plain: true }));

     // This will retrieve all Posts including all data from tables related. 
     const allLevels = await Posts.findAll({
          include: { all: true, nested: true },
          order: [["date_published", "DESC"]],
     });
     const postRecords = allLevels.map((list) => list.get({ plain: true }));

     res.render('articles', {
          postRecords,
          logged_in: req.session.logged_in,
          userid: req.session.user_id,
          user_name: req.session.user_name,
     });
})

module.exports = router;