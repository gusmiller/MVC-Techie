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
const { Users } = require("../models");
const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
     res.render('hero');
});

router.get('/login', (req, res) => {
     if (req.session.logged_in) {
          res.redirect('/');
          return;
     }

     res.render('login');
});

router.get('/posts', (req, res) => {
     if (req.session.logged_in) {
          res.redirect('/login');
          return;
     }

     res.render('posts');
})

router.get('/reply', (req, res) => {
     if (req.session.logged_in) {
          res.redirect('/login');
          return;
     }

     res.render('reply');
})

module.exports = router;
