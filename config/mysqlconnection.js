/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/13/2023 4:33:15 AM
 *******************************************************************/
require('dotenv').config();

const mysql = require('mysql2/promise');

exports.connectmysql = async function database() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}