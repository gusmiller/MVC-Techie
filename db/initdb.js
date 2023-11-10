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
const figlet = require("figlet");

const connection = require("../config/newdb");
const Chalk = require('chalk');
const mysql = require('mysql2/promise');
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

     displayMessage("OntarioTECK");
     displayMessage("Tech-Blog Site");

     const [rows, fields] = await cnn.execute(dic.sql.validateobject + `WHERE SCHEMA_NAME="${value}"`);

     if (rows.length === 0) {
          await cnn.query(`CREATE DATABASE IF NOT EXISTS ${value};`);
          messages.msg(Chalk.bgRed(dic.messages.createdatabase + `${value}`), null, null, 80);
          return { created: true, data: false };

     } else {
          messages.msg(Chalk.bgGreen(`DATABASE ${value} ALREADY EXISTS!`));
          return { created: true, data: true };
     };

}

function displayMessage(message) {
     figlet(message, function (err, data) {
          if (err) {
               console.log("Something went wrong...");
               console.dir(err);
               return;
          }
          console.log(data);
     });
}
