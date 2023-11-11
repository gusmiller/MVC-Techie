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

const mysql = require('mysql2/promise');

exports.connectmysql = async function database() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SYS
        });
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}