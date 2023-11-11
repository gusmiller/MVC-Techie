/****************************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * 
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 10:02:04 PM
 * 
 * Description :
 * This file contains sql statements used throughout the application.
 * These queries are standard queries with no parameters. Those type
 * of queries are taken care when needed. 
 *****************************************************************************/
const chalk = require("chalk");

const sql = {
    validateobject:`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA `
}

const messages = {
    mysqlLapps: chalk.bgRed("Carleton Universty Coding Bootcamp"),
    userseeded: chalk.bgGreen("Users table has been seeded"),
    categoriesseeded: chalk.bgGreen("Category table has been seeded"),
    listeningdata: chalk.bgGreen('----- LISTENING PLEASE GO TO A BROWSER TO ACCESS DATA -----'),
    createdatabase: `Run query: CREATE DATABASE IF NOT EXISTS `
}
module.exports = { sql, messages };