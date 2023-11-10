/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const chalk = require('chalk');

// OntarioTECK VBA Custom customized initialization
const initializedatabase = require('./db/initdb')
const messages = require("./utils/formatter")
const dic = require("./db/queries");
const seeding = require('./seeds/customseed');

const app = express();
const PORT = process.env.PORT || 3001;

// Instance of an Express Handlebars engine in a Node.js application using 
// express-handlebars library. 
const hbs = exphbs.create({ helpers });

// his is an Express.js method that allows you to set up a template engine. A 
// template engine is a tool that allows you to embed dynamic content into 
// static templates. In the context of web development, it's often used to 
// generate HTML dynamically.
// hbs.engine - is the actual template engine. 
app.engine('handlebars', hbs.engine);

// Configure the view engine for the Express.js application. The second argument 
// sets the 'view engine' to 'handlebars' extension files.
app.set('view engine', 'handlebars');

// Start of middleware section ************************

// This is a built-in middleware function in Express. It parses incoming requests 
// with JSON payloads and is based on body-parser.
// https://expressjs.com/en/5x/api.html
app.use(express.json());

// Returns middleware that only parses urlencoded bodies and only looks at requests 
// where the Content-Type header matches the type option. This parser accepts only 
// UTF-8 encoding of the body.
app.use(express.urlencoded({ extended: true }));

// Express.static: This is a middleware function in Express that serves static files. 
// Static files are files that don't change frequently. In the context here it joins
// two or more paths to the content of __dirname.
app.use(express.static(path.join(__dirname, 'public')));

// End of middleware section **************************

app.use(routes); // Routing defined in the ./routes index.js
process.stdout.write("\x1Bc");

// Custom validation to determine whether database exists or not, which in case it 
// does not exists then it will create.
initializedatabase.validateDB(process.env.DB_NAME)
     .then((data) => {

          if (data.created === true && data.data === false) {
               const sequelize = require('./config/connection');
               sequelize.sync({ force: false });
          }
          messages.apiendpoints();

          app.listen(PORT, () => messages.msg(messages.msg(dic.messages.listeningdata), null, null, 80));
          messages.msg(chalk.white('Application PORT :'), null, false);
          messages.msg(chalk.white(`     Port number : ${PORT}`), null, true);
     });