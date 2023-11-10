/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Model: Comments
 * Date : 11/10/2023 6:58:33 AM
 *******************************************************************/

// The destructuring assignment syntax is a JavaScript expression that makes it 
// possible to unpack values from arrays, or properties from objects, into distinct variables
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { Model, DataTypes, Sequelize } = require('sequelize');  //Destructuring imported data

const sequelize = require('../config/connection');

// Initialize Post model (table) by extending off Sequelize's Model class
class Category extends Model { }

Category.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          category_name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          date_created: {
               type: DataTypes.DATEONLY,
               allowNull: false,
               defaultValue: Sequelize.NOW,
          }
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'category',
     }
);

module.exports = Category;