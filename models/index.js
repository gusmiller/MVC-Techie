/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const Users = require("./user");
const Category = require("./category");
const Posts = require("./posts");
const Comments = require("./comments");
const Replies = require("./replies");

Posts.belongsTo(Category, {
     foreignKey: "category_id"
});

Posts.belongsTo(Users, {
     foreignKey: "user_id"
});

Posts.hasMany(Comments, {
     foreignKey: 'post_id',
});

Comments.belongsTo(Posts, {
     foreignKey: "post_id",
});

Comments.belongsTo(Users, {
     foreignKey: "user_id",
});

Replies.belongsTo(Comments, {
     foreignKey: "comment_id",
})

Replies.belongsTo(Users, {
     foreignKey: "user_id",
})

module.exports = { Users, Category, Posts, Comments, Replies };
