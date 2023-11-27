/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 * gustavo.miller@miller-hs.com CarletonUCoding
 *******************************************************************/
require('dotenv').config();

const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const seeding = require("./seeds/seeding");
const path = require("path");

// OntarioTECK VBA Custom customized initialization
const initializedatabase = require("./db/initdb")
const messages = require("./utils/formatter")
const sequelize = require("./config/connection");

// Create a new sequelize store using the express-session package
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Instance of an Express Handlebars engine in a Node.js application using 
// express-handlebars library. 
const hbs = exphbs.create({ helpers });

// Configure and link a session object with the sequelize store
// maxAge: 60 * 60 * 1000,
// maxAge: 150000,
const sess = {
     secret: "pmaC ytisrevinU notelraC",
     cookie: {          
          maxAge: 60 * 60 * 1000,
     },
     resave: false,
     saveUninitialized: false,
     store: new SequelizeStore({
          db: sequelize
     })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

// his is an Express.js method that allows you to set up a template engine. A 
// template engine is a tool that allows you to embed dynamic content into 
// static templates. In the context of web development, it's often used to 
// generate HTML dynamically.
// hbs.engine - is the actual template engine. 
app.engine("handlebars", hbs.engine);

// Start of middleware section ************************

// Express.static: This is a middleware function in Express that serves static files. 
// Static files are files that don"t change frequently. In the context here it joins
// two or more paths to the content of __dirname.
app.use(express.static(path.join(__dirname, './public')));

// Returns middleware that only parses urlencoded bodies and only looks at requests 
// where the Content-Type header matches the type option. This parser accepts only 
// UTF-8 encoding of the body.
//
// We could store this into a const and apply this middleware on a specific routes
//        const middle = express.urlencoded({ extended: true }));
//        app.post('/upload', middle, function(req, res)...
app.use(express.urlencoded({ extended: 'false' }));
// const middle = express.urlencoded({ extended: 'false' });

// This is a built-in middleware function in Express. It parses incoming requests 
// with JSON payloads and is based on body-parser.
// https://expressjs.com/en/5x/api.html
app.use(express.json());

// Configure the view engine for the Express.js application. The second argument 
// sets the 'view engine' to 'handlebars' extension files.
app.set("view engine", "handlebars");

// End of middleware section **************************

app.use(routes); // Routing defined in the ./routes index.js
process.stdout.write("\x1Bc");

messages.figletMsg("OntarioTECK");
messages.figletMsg("Tech-Blog Site");

// Custom validation to determine whether database contains all tables required 
// if not then it will create.
initializedatabase.validateDB(process.env.DB_NAME)
     .then((data) => {

          // The validate whether the database contains all the tables required 
          // in case there aren't the same number of tables require it forces to 
          // sync database using the models and seeds them
          if (data.created === true && data.data === false ) {

               // Make sure we have initial data since database was deemed not valid
               sequelize.sync({ force: true })
                    .then(() => {

                         try {
                              seeding.seedAll(sequelize) // Time to seed data
                                   .then(() => {
                                        // This will display a message on terminal
                                        messages.apiendpoints();
                                        app.listen(PORT);
                                   });
                         } catch (err) {
                              console.log(err);
                         }

                    });
          } else {
               // This will display a message on terminal
               messages.apiendpoints();
               app.listen(PORT);
          }

     });