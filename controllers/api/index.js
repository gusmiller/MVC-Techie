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

const userRoutes = require('./userRoutes');
const articlesRoutes = require('./articlesRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/articles', articlesRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
