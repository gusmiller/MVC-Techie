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
     res.render('hero', {
          logged_in: req.session.logged_in,
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
 * Posts route - this will allow current user to create a new post entry
 */
router.get('/create', withAuth, (req, res) => {
     res.render('create', {
          logged_in: req.session.logged_in,
          user_id: req.session.user_id
     });
})

/**
 * Posts route - this will display the posts existing in the system
 */
router.get('/posts', withAuth, (req, res) => {
     res.render('posts', {
          logged_in: req.session.logged_in,
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
          res.redirect('/login');
          return;
     }

     res.render('register');
})

module.exports = router;
