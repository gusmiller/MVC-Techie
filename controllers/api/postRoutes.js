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
const { Post } = require('../../models');

/**
 * User Create POST route - creates a new post for logged in user
 */
router.post('/create', async (req, res) => {
     try {

          const dsData = await Post.create(
               {
                    title: req.body.title,
                    description: req.body.description,
                    category_id: req.body.category_id
               }
          );
          
          Post.create({
               title: req.body.title,
               description: req.body.description,
               category_id: req.body.category_id,
               user_id: req.body.user_id
          })
               .then((data) => {
                    // Send the newly created row as a JSON object
                    res.json(data);
               })
               .catch((err) => {
                    res.json(err);
               });


     } catch (error) {
          res.status(400).json(error);
     }
});

module.exports = router;