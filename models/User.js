/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Model: Users
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/

// The destructuring assignment syntax is a JavaScript expression that makes it 
// possible to unpack values from arrays, or properties from objects, into distinct variables
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { Model, DataTypes } = require('sequelize');  //Destructuring imported data

// bcrypt is a password-hashing function designed by Niels Provos and David Mazières, 
// based on the Blowfish cipher and presented at USENIX in 1999
// https://en.wikipedia.org/wiki/Bcrypt
const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

class User extends Model {
     checkPassword(loginPw) {
          return bcrypt.compareSync(loginPw, this.password);
     }
}

User.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          email: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               validate: {
                    isEmail: true,
               },
          },
          date_registered: {
               type: DateTypes.STRING,
               allowNull: false,
          },
          password: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                    len: [8],
               },
          },
     },
     {
          hooks: {
               beforeCreate: async (newUserData) => {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
               },
          },
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'user',
     }
);

module.exports = User;
