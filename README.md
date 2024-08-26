# LoginPage

About
Made a Login Page using Node JS, MongoDB and Express where you can register a user and login (also user with admin access can see all the mongo database in a table structure)

You have to make a mongo database named project with collection named LoginDataBase ( which can be also edited in the server.js mongo connection area)

user with admin status given in mongoDB can access the database table structure
EXAMPLE
{
  "_id": {
    "$oid": "xyz"
  },
  "username": "ankan",
  "email": "ankan@gmail.com",
  "password": "ankan",
  "admin": true //admin area
}
