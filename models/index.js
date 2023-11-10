/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const User = require("./User");
const Post = require("./Post");
const Comments = require("./Comments");
const Replies = require("./Replies");
const Category = require("./Category")

Post.belongsTo(Category, {
     foreignKey: "category_id"
})

User.hasMany(Post, {
     foreignKey: "id",
     onDelete: "CASCADE",
})

Post.hasMany(Comments, {
     foreignKey: "id",
     onDelete: "CASCADE",
})

Comments.hasMany(Replies, {
     foreignKey: "id",
     onDelete: "CASCADE",
})

module.exports = { User, Post, Comments, Replies };
