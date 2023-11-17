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

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
//const anotherRoutes = require('./anotherRoutes'); // How to add another homeroute

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
//router.use('/another', anotherRoutes);

module.exports = router;
