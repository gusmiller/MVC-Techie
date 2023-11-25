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
const { Users, Category, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");
const dic = require("../db/queries");

// router.delete('/delete/:id'), withAuth, async (req, res) => {
//      try {
//           // This will retrieve all Posts including all data from tables related. 
//           const delId = await Posts.destroy({
//                where: { id: req.params.id },
//           });

//           if (delId) {
//                return res.status(200).json({ delId });
//           } else {
//                return res.status(404).json(err);
//           }

//      } catch {
//           console.log(error.stack);
//      }
// }

router.get('/', async (req, res) => {
     res.render('hero', {
          logged_in: req.session.logged_in,
          userid: req.session.userid,
          user_name: req.session.user_name,
     });

});

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
               userid: req.session.userid,
               logged_in: req.session.logged_in,
               user_name: req.session.user_name
          });

     } catch (error) {
          console.log(error.stack);
     }
})

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
               userid: req.session.userid,
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
               userid: req.session.userid,
               logged_in: req.session.logged_in,
               user_name: req.session.user_name
          });

     } catch (error) {
          console.log(error.stack);
     }

})

/**
 * Login route - user will be presented with login screen to 
 * enter their credentials
 */
router.get('/login', (req, res) => {
     if (req.session.logged_in) {
          res.redirect('/');
          return;
     }

     res.render('login', {
          logged_in: req.session.logged_in,
          userid: req.session.userid,
          user_name: req.session.user_name,
     });

});

/**
 * This is the post from the form -which is sent on submit. It was handled before on 
 * javascript but i believe that this is better.
 */
router.post('/login', async (req, res) => {
     const { email, password} = req.body;
     
     // Retrieve user - we use the email address as the login
     const dsData = await Users.findOne({ where: { email: email } });

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
          req.session.userid = dsData.id;
          req.session.user_name = dsData.name;
          req.session.logged_in = true;
     });

     res.redirect('/articles');
     // res.render('hero', {
     //      logged_in: req.session.logged_in,
     //      userid: req.session.userid,
     //      user_name: req.session.user_name,
     // });

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
          userid: req.session.userid,
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
          userid: req.session.userid,
          user_name: req.session.user_name,
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
