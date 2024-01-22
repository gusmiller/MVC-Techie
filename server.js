/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
require('dotenv').config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");

// OntarioTECK VBA Custom customized initialization
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const seeding = require("./seeds/seeding");
const initializedatabase = require("./db/initdb")
const messages = require("./utils/formatter")

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Instance of an Express Handlebars engine in a Node.js application using 
// express-handlebars library. 

const hbs = exphbs.create({
     helpers: helpers,
     defaultLayout: 'main',
     noCache : true,
});

// Configure and link a session object with the sequelize store
const sess = {
     secret: "pmaCedoC ytisrevinU notelraC",
     cookie: {
          maxAge: 60 * 60 * 1000,
     },
     resave: false,
     saveUninitialized: true,
     store: new SequelizeStore({
          db: sequelize
     })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

// This is an Express.js method that allows you to set up a template engine. A 
// template engine is a tool that allows you to embed dynamic content into 
// static templates. In the context of web development, it's often used to 
// generate HTML dynamically.
// hbs.engine - is the actual template engine. 
app.engine("handlebars", hbs.engine);

// This is a built-in middleware function in Express. It parses incoming requests 
// with JSON payloads and is based on body-parser.
// https://expressjs.com/en/5x/api.htmlapp.use(express.json())
app.set('view engine', 'handlebars')

// This is a built-in middleware function in Express. It parses incoming requests 
// with JSON payloads and is based on body-parser.
// https://expressjs.com/en/5x/api.html
app.use(express.json());

// Returns middleware that only parses urlencoded bodies and only looks at requests 
// where the Content-Type header matches the type option. This parser accepts only 
// UTF-8 encoding of the body.
//
// We could store this into a const and apply this middleware on a specific routes
//        const middle = express.urlencoded({ extended: true }));
//        app.post('/upload', middle, function(req, res)...
app.use(express.urlencoded({ extended: 'false' }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

process.stdout.write("\x1Bc");

initializedatabase.validateDB(process.env.DB_NAME)
     .then((data) => {

          // The validate whether the database contains all the tables required 
          // in case there aren't the same number of tables require it forces to 
          // sync database using the models and seeds them
          if (data.created === true && data.data === false) {

               // Make sure we have initial data since database was deemed not valid
               sequelize.sync({ force: true })
                    .then(() => {

                         try {
                              seeding.seedAll(sequelize) // Time to seed data
                                   .then(() => {
                                        messages.apiendpoints(); // Message on terminal
                                        app.listen(PORT);
                                        process.exit();
                                   });
                         } catch (err) {
                              console.log(err);
                         }

                    });
          } else {
               app.listen(PORT);
               messages.apiendpoints(); // Message on terminal
          }

     });