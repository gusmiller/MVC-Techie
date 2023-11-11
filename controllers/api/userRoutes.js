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
          const dsData = await Users.findOne({ where: { email: req.body.email } });

          if (!dsData) {
               res
                    .status(400)
                    .json({ message: 'Incorrect email or password, please try again' });
               return;
          }

          const validPassword = await dsData.checkPassword(req.body.password);

          if (!validPassword) {
               res
                    .status(400)
                    .json({ message: 'Incorrect email or password, please try again' });
               return;
          }

          req.session.save(() => {
               req.session.user_id = dsData.id;
               req.session.logged_in = true;

               res.json({ user: dsData, message: 'You are now logged in!' });
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
});

module.exports = router;
