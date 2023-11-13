/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/13/2023 9:38:30 AM
 *******************************************************************/
const router = require("express").Router();
const { Users, Category, Post, Comments } = require("../models");
const withAuth = require("../utils/auth");
const dic = require("../db/queries");

router.get('/comments', (req, res) =>{
     res.render('hero', {
          logged_in: req.session.logged_in,
          user_name: req.session.user_name,
     });
})

module.exports = router;