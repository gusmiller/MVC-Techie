/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const Users = require("./User");
const Category = require("./Category");
const Post = require("./Post");
const Comments = require("./Comments");
const Replies = require("./Replies");

Post.belongsTo(Category, {
     foreignKey: "category_id"
});

Post.belongsTo(Users,{
     foreignKey: "user_id"
});

Post.hasMany(Comments, {
     foreignKey: 'post_id',
   });

Comments.belongsTo(Post, {
     foreignKey: "post_id"
});

module.exports = { Users, Category, Post, Comments, Replies };
