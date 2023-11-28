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
const { Users } = require('../../models');

router.post('/login', async (req, res) => {
     try {
          // Find the user who matches the posted e-mail address
          const userData = await Users.findOne({ where: { email: req.body.email } });

          if (!userData) {
               res
                    .status(400)
                    .json({ message: 'Incorrect email or password, please try again' });
               return;
          }

          // Verify the posted password with the password store in the database
          const validPassword = await userData.checkPassword(req.body.password);

          if (!validPassword) {
               res
                    .status(400)
                    .json({ message: 'Incorrect email or password, please try again' });
               return;
          }

          // Create session variables based on the logged in user
          req.session.save(() => {
               req.session.user_id = userData.id;
               req.session.user_name = userData.name;
               req.session.is_admin = userData.is_admin;
               req.session.logged_in = true;
               req.session.form_name = "/";

               res.json({ user: userData, message: 'You are now logged in!' });
          });

     } catch (err) {
          res.status(400).json(err);
     }
});

router.post('/logout', (req, res) => {
     if (req.session.logged_in) {
          req.session.destroy(() => {
               res.status(204).end();
          });
     } else {
          res.status(404).end();
     }
     res.redirect("/articles");
});

/**
 * User Registration POST endpoint - creates a new user and a new session
 * cookie.
 */
router.post('/register', async (req, res) => {
     try {
          const dsData = await Users.create(
               {
                    name: req.body.username,
                    email: req.body.useremail,
                    password: req.body.userpassword,
               }
          );

          // Login successfull create a session and initializer variables based data from table
          req.session.save(() => {
               req.session.user_id = dsData.id;
               req.session.user_name = dsData.name;
               req.session.is_admin = false,
               req.session.logged_in = true;
               req.session.form_name = "/";

               res.json({ user: dsData, message: 'You are now logged in!' });
          });

          res.status(200).json(dsData);

     } catch (error) {
          res.status(400).json(error);
     }
})

/**
 * User Registration validation POST endpoint - validate email does not already exists 
 * we dont tell the user that information
 */
router.post('/validate', async (req, res) => {
     try {

          // Retrieve user - we use the email address as the login
          const dsData = await Users.findOne({ where: { email: req.body.email } });

          if (dsData) {
               res
                    .status(400)
                    .json({ message: 'Incorrect email or password, please try again' });
               return;
          }

     } catch (error) {
          res.status(400).json(error);
     }
});

module.exports = router;