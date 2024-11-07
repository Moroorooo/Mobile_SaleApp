# Step to run this app

1. In folder config we have db.sql -> run this db.sql to create database.
2. Run command `npm i` to install all the necessary library
3. Create file .env in project
4. Create variable in .env (follow .env.example)
5. Run command `npm run start` to start the source code
6. In this source using library knex.js for crud data. Please read this site: [Knex.js](https://knexjs.org/guide/query-builder.html)

**Server is running on `http://localhost:8000`**

**Swagger is running on `http://localhost:8000/api-docs`**

**Swagger Json is running on `http://localhost:8000/api.json`**

# Source code structure:

- config: This is folder to setup database connection
- controllers: this is folder to create controller for each endpoint
- middlewares: this is folder to create middleware for each endpoint
- routes: this is folder to create route for each endpoint
- services: this is folder to create service for each endpoint
