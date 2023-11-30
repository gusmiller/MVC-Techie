/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 9:55:15 PM
 *******************************************************************/
require('dotenv').config();

const connection = require("../config/mysqlconnection");
const sequelize = require('../config/connection');
const Chalk = require('chalk');
const messages = require("../utils/formatter")
const dic = require("./queries");

/**
 * This function will validate the database contains tables seeded. The iniial query 
 * for this validation only includes the users table, but using a UNION query we can 
 * validate several tables
 * @param {string} value - database to validate
 * @returns true/false
 */
async function validateUsers(cnn, value) {

     // Validate whether or not we have the users table - minimum requirement for template
     let sSQl = dic.sql.validatetables + `Table_name="users";`
     //const [rows, fields] = await cnn.execute(sSQl);
     const [rows, fields] = await sequelize.query(sSQl);

     if (rows[0].TablesCount === 0) {
          return false; // Fail process
     } else {
          // Retrieve records from SQL
          //const [rows, fields] = await cnn.execute(dic.sql.totalusers);
          const [rows, fields] = await sequelize.query(dic.sql.totalusers);
          if (rows.length === 0) return false; // Fail proces if no records
          if (rows[0].TotalUsers !== 0) return true; // Successfull return

     }
}

/**
 * This function will validate the database exists or not. This saves 1 step to manually create the
 * database prior to running the application.
 * @param {string} value - database to validate
 * @returns 
 */
exports.validateDB = async function (value) {
     const cnn = await connection.connectmysql(value); // Get connection to database

     if (await validateUsers(cnn, value) === false) {
          messages.msg(Chalk.bgRed(dic.messages.emptyusers), null, null, 80);
          return { created: true, data: false };
     };

     if (process.env.DB_SEED === "YES") {

          messages.msg(Chalk.bgRed(dic.messages.createdatabase), null, null, 80);
          return { created: true, data: false };

     } else {
          messages.msg(Chalk.bgGreen(`DATABASE ${value} ALREADY EXISTS!`));
          return { created: true, data: true };
     };

}