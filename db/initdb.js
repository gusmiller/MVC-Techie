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

const connection = require("../config/newdb");
const Chalk = require('chalk');
const messages = require("../utils/formatter")
const dic = require("./queries");

/**
 * This function will validate the database exists or not. This saves 1 step to manually create the
 * database prior to running the application.
 * @param {string} value - database to validate
 * @returns 
 */
exports.validateDB = async function (value) {
     const cnn = await connection.connectmysql(); // Get connection to database

     const [rows, fields] = await cnn.execute(dic.sql.validatetables + `"${value}"`);

     if (rows[0].TablesCount.toString() !== process.env.DB_COUNT) {

          messages.msg(Chalk.bgRed(dic.messages.createdatabase), null, null, 80);
          return { created: true, data: false };

     } else {
          messages.msg(Chalk.bgGreen(`DATABASE ${value} ALREADY EXISTS!`));
          return { created: true, data: true };
     };

}