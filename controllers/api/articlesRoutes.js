/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/12/2023 8:31:03 AM
 *******************************************************************/
const router = require('express').Router();
const { Posts, Category } = require('../../models');
const sequelize = require('../../config/connection');
const dic = require("../../db/queries");

router.delete('/delete/id', async (req, res) => {
     try {

          // This will retrieve all Posts including all data from tables related. 
          const delId = await Posts.destroy({
               where: { id: req.params.id },
          });

          if (delId) {
               return res.status(200).json({ delId });
          } else {
               return res.status(404).json(err);
          }

     } catch (error) {
          res.status(400).json(error);
     }
});
/**
 * This API Endpoint will update the Posts information, this comes from the 
 * editarticles script that is attached to the edithandlebars. 
 */
router.put('/update/:id', async (req, res) => {

     try {
          const dsData = await Posts.update(req.body, {
               where: {
                    id: req.params.id
               }
          });
          res.status(200).json(dsData);

     } catch (error) {
          res.status(400).json(error);
     }
})

/**
 * This API Endpoint will retrieve a list of all members which is used to manipulate
 * the DOM. This is called from the categories.js (api/articles/members)
 */
router.get('/members', async (req, res) => {
     try {

          const [results, metadata] = await sequelize.query(dic.sql.getmembers);
          res.json(results);

     } catch (error) {
          res.status(400).json(error);
     }
});

/**
 * User calls a POST endpoint - creates a new articles for logged in user
 */
router.post('/create', async (req, res) => {
     try {

          const dsData = await Posts.create(
               {
                    title: req.body.title,
                    description: req.body.description,
                    category_id: parseInt(req.body.categoryid),
                    user_id: parseInt(req.body.user_id),
               }
          );
          res.json(dsData);

     } catch (error) {
          res.status(400).json(error);
     }
});

module.exports = router;