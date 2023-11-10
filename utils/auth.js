/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const withAuth = (req, res, next) => {
     if (!req.session.logged_in) {
          res.redirect('/login');
     } else {
          next();
     }
};

module.exports = withAuth;
