/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const { Users, Category } = require('../models');
const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const messages = require("../utils/formatter");
const dic = require("../db/queries");
const db = require("../config/mysqlconnection")

var path = require("path");

// fs is a Node standard library package for reading and writing files
const fs = require("fs");


/**
 * This function will execute the SQL statement passed in parameters
 * @param {string} value - SQL Statement to execute
 * @returns true/false
 */
async function executeSQL(value) {
     const connection = await db.connectmysql(); // Get connection to database

     try {
          for (let x = 0; x <= value.length - 1; x++) {

               if (value[x].length !== 0) {
                    console.log(value[x] + `;`);
                    await connection.execute(value[x]);
               }
          }
          return true;

     } catch (error) {
          console.log(dic.messages.executefailed + ` Error: ${error.stack}`);
          return false;
     } finally {
          connection.end(); // Close the database connection when done
     }
}

exports.seedAll = async () => {

     await Category.bulkCreate(categoryData);
     messages.msg(dic.messages.categoriesseeded, null, null, 80);

     await Users.bulkCreate(userData, { individualHooks: true, returning: true, });
     messages.msg(dic.messages.userseeded, null, null, 80);

     // These two lines show the paths using the path express api
     // console.log(path.resolve(__dirname, '../db/scripts/postdata.sql'));
     // console.log(process.cwd());

     // The fs.readFileSync() method is an inbuilt application programming interface of 
     // the fs module which is used to read the file and return its content. 
     // https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
     let postsData = fs.readFileSync(path.resolve(__dirname, '../db/scripts/postdata.sql'), 'utf-8');

     // Import data directly from database. This uses a connection using MySQL npm package to 
     // connect database. The sql script needs to be parsed to avoid errors in syntax.
     // Important note: not all commands are supported, for example "use {database}" is not recognize
     parsedSQL = messages.parseSqlFile(postsData);

     try {
          const response = await executeSQL(parsedSQL); // Import all testing posts
          if (response) {
               messages.msg(dic.messages.postsseeded, null, null, 80);

               // Retrieve next file: testing data for comments.
               postsData = fs.readFileSync(path.resolve(__dirname, '../db/scripts/populateComments.sql'), 'utf-8');
               parsedSQL = messages.parseSqlFile(postsData)
               await executeSQL(parsedSQL); // Import all testing comment post  
          }

     } catch (error) {
          console.log(dic.messages.customseedingfailed + ` Error: ${error.stack}`);
     }
};