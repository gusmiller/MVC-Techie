/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/15/2023 7:03:29 PM
 *******************************************************************/
const router = require('express').Router();
const { Comments } = require('../../models');

/**
 * User Create POST route - creates a new post for logged in user
 */
router.post('/create', async (req, res) => {
     try {

          const dsData = await Comments.create(
               {
                    comment: req.body.replycomment,
                    post_id: parseInt(req.body.post_id),
                    user_id: parseInt(req.body.user_id),
               }
          );
          res.status(200).json(dsData);

     } catch (error) {
          res.status(400).json(error);
     }
});

module.exports = router;