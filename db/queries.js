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
     validateobject: `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA `,
     validatetables: `SELECT count(*) TablesCount FROM information_schema.tables WHERE table_schema=`,
     retrievesql: `SELECT posts.id, title, description, category_id, category.name, posts.user_id, comment from posts join category on category.id=posts.category_id left join comments on comments.post_id=posts.id;`,
     getcategories: `select distinctrow category.id, name from category join posts on posts.category_id=category.id`,
     getmembers: `select id, name from users`,
     editpost: `select id,title,description from posts where id=`
}

const messages = {
     mysqlLapps: chalk.bgRed("Carleton Universty Coding Bootcamp"),
     userseeded: chalk.bgGreen("Users table has been seeded"),
     postsseeded: chalk.bgGreen("Posts table has been seeded with testing data"),
     commentsseeded: chalk.bgGreen("Comments table has been seeded with testing data"),
     customseedingfailed: chalk.red("Custom seeding process has failed!"),
     executefailed: chalk.red("SQL Execute failed!"),
     commentsseeded: chalk.bgGreen("Comments table has been seeded with testing data"),
     categoriesseeded: chalk.bgGreen("Category table has been seeded"),
     listeningdata: chalk.bgGreen('----- LISTENING PLEASE GO TO A BROWSER TO ACCESS DATA -----'),
     createdatabase: `There are missing tables in the database! Synchronize database.`,
     registernot: `You cannot register! It looks like you are already signed in!`
}
module.exports = { sql, messages };