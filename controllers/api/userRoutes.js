/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const router = require('express').Router();
const { Users } = require('../../models');

/**
 * User Login POST endpoint - validate user login and create a session at login.
 */
router.post('/login', async (req, res) => {
     try {

          // Retrieve user - we use the email address as the login
          const dsData = await Users.findOne({ where: { email: req.body.email } });

          if (!dsData) {
               res
                    .status(400)
                    .json({ message: 'Incorrect email or password, please try again' });
               return;
          }

          // Compare and validate password against what user has in database
          const validPassword = await dsData.checkPassword(req.body.password);

          if (!validPassword) {
               res
                    .status(400)
                    .json({ message: 'Incorrect email or password, please try again' });
               return;
          }

          // Login successfull create a session and initializer variables based data from table
          req.session.save(() => {
               req.session.user_id = dsData.id;
               req.session.user_name = dsData.name;
               req.session.logged_in = true;

               res.json({ user: dsData, message: 'You are now logged in!' });
          });

     } catch (error) {
          res.status(400).json(error);
     }
});

/**
 * User POST endpoint logout - destroy session. Returns back to Javscript on main.js to 
 * continue with process. It will redirect user to the main portal
 */
router.post('/logout', (req, res) => {
     if (req.session.logged_in) {
          req.session.destroy(() => {
               res.status(204).end();
          });
     } else {
          res.status(404).end();
     }
});

module.exports = router;
