/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/13/2023 8:13:05 AM
 *******************************************************************/
const router = require('express').Router();
const { Post, Comments } = require('../../models');

/**
 * User Create POST route - creates a new post for logged in user
 */
router.get('/comments/create', async (req, res) => {
     try {

          const dsData = await Post.create(
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