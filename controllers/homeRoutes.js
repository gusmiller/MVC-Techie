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
const { Users } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
     try {
          const userData = await Users.findAll({
               attributes: { exclude: ['password'] },
               order: [['name', 'ASC']],
          });

          const users = userData.map((project) => project.get({ plain: true }));

          res.render('homepage', {
               users,
               logged_in: req.session.logged_in,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

router.get('/login', (req, res) => {
     if (req.session.logged_in) {
          res.redirect('/');
          return;
     }

     res.render('login');
});

module.exports = router;
