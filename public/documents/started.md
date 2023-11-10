# 14 Model-View-Controller (MVC): Tech Blog

## Getting Started

Your application’s folder structure must follow the Model-View-Controller paradigm. You’ll need to use the <br/>
[express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views,<br/>
[MySQL2](https://www.npmjs.com/package/mysql2) <br/>
[Sequelize](https://www.npmjs.com/package/sequelize) packages to connect to a MySQL database for your Models, and create an Express.js API for your Controllers.

You’ll also need the <br/>
[dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables <br/>
[bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords <br/> 
[express-session](https://www.npmjs.com/package/express-session) <br/>
[connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication.

**Note**: <span style="color:red;">(Important)</span> <br/>
[express-session](https://www.npmjs.com/package/express-session) package stores the session data on the client in a cookie.  <br/>
When you are idle on the site for more than a set time, the cookie will expire and you will be required to log in again to start a new session. This is the default behavior and you do not have to do anything to your application other than implement the npm package.