/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Model: Posts
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/

// The destructuring assignment syntax is a JavaScript expression that makes it 
// possible to unpack values from arrays, or properties from objects, into distinct variables
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { Model, DataTypes, Sequelize } = require('sequelize');  //Destructuring imported data

const sequelize = require('../config/connection');

// Initialize Post model (table) by extending off Sequelize's Model class
class Post extends Model { }

Post.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          title: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          description: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          date_published: {
               type: DataTypes.DATEONLY,
               allowNull: false,
               defaultValue: Sequelize.NOW,
          },
          date_edited: {
               type: DataTypes.DATEONLY,
               allowNull: false,
          },
          category_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'Category',
                    key: 'id',
               }
          },
          user_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'User',
                    key: 'id',
               }
          }
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'post',
     }
);

module.exports = Post;