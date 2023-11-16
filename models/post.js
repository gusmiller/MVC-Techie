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
               unique: true,
               allowNull: false,
          },
          description: {
               type: DataTypes.TEXT,
               allowNull: false,
          },
          date_published: {
               type: DataTypes.DATE,
               allowNull: false,
               defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          date_edited: {
               type: DataTypes.DATE,
               allowNull: true,
               defaultValue: null,
          },
          number_replies: {
               type: DataTypes.INTEGER,
               allowNull: false,
               defaultValue: 0,
          },
          category_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: 'category',
                    key: 'id',
               }
          },
          user_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: 'users',
                    key: 'id',
               }
          }
     },
     {
          hooks: {
               beforeUpdate: async (instance, options) => {
                    instance.date_edited =
                          Sequelize.literal('CURRENT_TIMESTAMP');
               },
          },
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'post',
     }
);

module.exports = Post;