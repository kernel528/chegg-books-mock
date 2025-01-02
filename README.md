# Chegg Books Mock 1

## Description
This repo is setup to practice for the the back-end web development mock interview.  The mock interview will be based on the Chegg Books API from Module 3.9.6 Assessment.

## Project Structure
```plaintext
├── .env
├── .gitignore
├── knexfile.js
├── package.json
├── package-lock.json
├── README.md
|── src/
    ├── app.js
    ├── server.js
    ├── books/
        ├── books.controller.js
        ├── books.router.js
        ├── books.service.js
    ├── authors/
        ├── authors.controller.js
        ├── authors.router.js
        ├── authors.service.js
    ├── genres/
        ├── genres.controller.js
        ├── genres.router.js
        ├── genres.service.js
    ├── db/
        ├── connection.js
        ├── migrations/
            |── 20210901120000_authors.js // These will be created with `npm run knex migrate:make authors`
            |── 20210901120100_books.js
            |── 20210901120200_genres.js
            |── 20210901120300_books_genres.js
        ├── seeds/
            |── seed_data.sql
    ├── errors/
        ├── methodNotAllowed.js
    ├── setup/
        ├── authors.sql
        ├── books.sql
        ├── books_genres.sql
        ├── genres.sql
    ├── utils/
        ├── utils.js
````


## Project Outline
1. Pre-work
   - Database:
     - Setup a docker volume for the postgres data.  This will be a shared local volume for local dev testing.
       - `docker volume create postgres-obiwan-data`
     - Deploy a postgres DB instance using docker.  This will be used for development and testing.
        - `docker container run -it --name chegg-dev-obiwan --hostname chegg-dev-obiwan -e POSTGRES_PASSWORD=<some password> -p 5432:5432 -v postgres-obiwan-data:/var/lib/postgresql/data -d kernel528/postgres:16`
     - Login to DB instance:
       - `docker container run -it --rm --name postgres-psql kernel528/postgres:16 psql -h host.docker.internal -U postgres -d chegg_books_obiwan`
       - This creates a default chegg_books_obiwan database.  Which will be used for manual interactions.
     - Create new `dev` and `prd` databases for knex integrations:
       - `CREATE DATABASE chegg_books_obiwan_dev;`  --> Used for dev development.
       - `CREATE DATABASE chegg_books_obiwan_prd;`  --> Used for production.
     - Setup DBeaver connection to the `chegg_books_obiwan` databases.
     - Setup Database source with IDE (optional).
     - Create a `data/books-data.js` to be used as initial flat file data to test the API.
     - Create a `setup` folder with the following files.  These will be used to setup the tables and seed data manually to the database pre-knex integration.
       - `authors.sql`
       - `books.sql`
       - `books_genres.sql`
       - `genres.sql`
2. Review requirements and setup project structure.  Context:  Replicate and extend the chegg_books project from the Chegg Skills curriculum.
   - Create flow diagram with lucidchart. (_Simulate_)
     - This would usually be in cooperation with frontend developers/team as well.
   - Create a Trello board.  (_Simulate_)
     - This would be used to identify tasks, organize work and estimate effort, and track progress.
   - Create a database ERD with lucidchart. (_Simulate_)
     - I would normally use an AI assistant to create the ERD starter, and chose to use lucidchart for this project.
3. Create a basic Express server.
   - Setup the basic server structure with Express.
   - Create a basic route to validate the server is running properly.
4. Create a basic API for managing a "Books" resource.
   - GET /books - Return all books.
   - POST /books - Add a new book.
   - PUT /books/:id - Update an existing book.
   - DELETE /books/:id - Remove a book.
5. Write middleware functions to validate the request body.
   - Create a middleware function to validate the request body for POST and PUT requests.
   - Ensure that the request body contains the required fields.
   - Return a 400 status with a descriptive error if validation fails.
6. Integrate a PostgreSQL database with the API.
   - Create a database called `chegg_books`.
   - Setup a .env file to store the database connection string.
     - `DEVELOPMENT_DATABASE_URL=postgres://username:password@localhost:5432/chegg_books_dev`
     - `PRODUCTION_DATABASE_URL=postgres://username:password@localhost:5432/chegg_books_prod`
   - Create several tables: authors, books, genres, books_genres, seed_data.
     - Setup .sql files to create the tables.
7. Implement the GET, POST, PUT, and DELETE operations using the database.
   - CRUD with knex:  [Module 3.10.6](https://students.skills.chegg.com/curriculum/BACK_END-501/be-backend-web-development/be-node-express-and-postgres/be-crud-with-knex)
      - Create the routes, controllers, and services for the books, authors, and genres resources.
8. Ensure that the API interacts with the database correctly.
9. Add knex functionality to the project.
   - Use `npm install knex` to install knex.
10. Setup migrations and seeds folders.
    - Use `npm run knex migrate:make authors` to create the migration files.

## Node and Express App Installation
1. Clone this repository.
2. `cd` into the newly created directory.
3. Create package.json file:
    ```bash
    npm init -y
    ```
4. Install dependencies:
    ```bash
   npm install express
   npm install nodemon --save-dev
   npm install dotenv
   npm install cors
    ```
5. Create a `.env` file and include your PORT:
    ```
   PORT=5020
    ```
6. Update the `package.json` file to include the following scripts:
    ```json
    "scripts": {
      "start": "node src/server.js",
      "start:dev": "nodemon src/server.js"
    }
    ```

## Configure Application & Server Files
1. Create an `app.js` file:
    ```javascript
   const express = require('express');
   const app = express();
   const cors = require('cors');
   
   app.use(express.json());
   app.use(cors());

   // Placeholder for routes...
   
   // Placeholder for Not found handler: 404
   
   // Placeholder for Error handler: 500
   
   module.exports = app;
    ```
2. Setup the basic API routes in the `app.js` file.  --> Just to validate the server is running properly.
    ```javascript
   app.get("/", (req, res) => {
     res.send("Hello!  Welcome to the Books and Authors API Query Service!");
   });
    ```
3. Create a `server.js` file:
    ```javascript 
   require('dotenv').config();
   
   const { PORT = 5020 } = process.env;
   
   const app = require('./app');
   
   app.listen(PORT, () => {
         console.log(`Server is listening on port http://localhost:${PORT}`);
   });
   ```
4. Run the application:
    ```bash
   npm start // production
   npm run start:dev // development
   ```
5. Navigate to `localhost:5020` in your browser. --> Should see the message above in the browser.

### Setup Basic API Service for /books
Goals:
- Setup a `/books` route with basic methods:  `GET`, `POST`, `DELETE`.
- Setup a `/books/:id` route with basic methods:  `GET`, `PUT`, `DELETE`.

1. Create a `books` folder with the following files:
   - `books.controller.js` // middleware functions
   - `books.router.js`     // routes
2. Setup the /books route in `src/books/books.router.js`
    - Setup GET (list all books), 
    - POST (add a new book), 
3. Setup the /books middleware functions in `src/books/books.controller.js`
   - Setup the middleware functions for the GET and POST routes.
4. Setup the /books/:bookId route in `src/books/books.router.js`
    - Setup GET (get a book by id), 
    - PUT (update a book by id), 
    - DELETE (remove a book by id) routes.

### Integrate with Postgres DB using Knex
1. Setup knex and postgres DB.
   - Install knex:  `npm install knex`
   - Install pg:  `npm install pg`
2. Initialize knex:  `npx knex init`
     - Update the `knexfile.js` file to include the development and production configurations.
       - The default file will need some tweaking to match Chegg Skills pattern, but it's a good starting point. Setup the `development` and `production` configurations the same.
       - Update the `knexfile.js` file to include the database connection string.  This will come from the `.env` file.
       - Hardcoded example (only):
       ```javascript
         module.exports = {
            development: {
              client: 'pg',
              connection: 'postgres://username:password@localhost:5432/chegg_books_dev',
              migrations: {
                 directory: './src/db/migrations',
              },
              seeds: {
                 directory: './src/db/seeds',
              },
            },
            production: {
              client: 'pg',
              connection: 'postgres://username:password@localhost:5432/chegg_books_prod',
              migrations: {
                 directory: './src/db/migrations',
              },
              seeds: {
                 directory: './src/db/seeds',
              },
            },
         };
         ```
3. Update the `.env` file to store the database connection string.
   - `DEVELOPMENT_DATABASE_URL=postgres://username:password@localhost:5432/chegg_books_dev?SSL=true`
   - `PRODUCTION_DATABASE_URL=postgres://username:password@localhost:5432/chegg_books_prod`
4. Setup DB `connection.js` file
   - Create a `db` under the `src` folder and create the a `connection.js` file in the `db` folder.
   - Update the `connection.js` file to include the database connection.
     ```javascript
      const env = process.env.NODE_ENV || "development";
      const config = require("../../knexfile")[env];
      const knex = require("knex")(config);
      
      module.exports = knex;
      ```
5. Use `knex` to create migrations files for the tables. In this order due to relations.  Refer to `setup/Notes.md` and ERD for more info...
   - Use `npx knex migrate:make createGenresTable` to create the `genres` migration file.
   - Use `npx knex migrate:make createAuthorsTable` to create the `authors` migration file.
   - Use `npx knex migrate:make createBooksTable` to create the `books` migration file.
   - Use `npx knex migrate:make createBooks_GenresTable` to create the `books_genres` migration file.
6. Update the migrations files with table schema.
   - Update the `up` and `down` functions in the migration files to create and drop the tables.
   - Use `npx knex migrate:latest` to run the migrations.
   - Check the database to ensure the tables were created.
7. Use `knex` to create seed files for the tables.
   - Use `npx knex seed:make seedGenres` to create the `genres` seed file.
   - Use `npx knex seed:make seedAuthors` to create the `authors` seed file.
   - Use `npx knex seed:make seedBooks` to create the `books` seed file.
   - Use `npx knex seed:make seedBooks_Genres` to create the `books_genres` seed file.
   - Update the seed files with sample data.
   - Run the seed files with `npx knex seed:run`.
8. Create the service functions for the books, authors, and genres resources.
   - Create a `books.service.js` file in the `src/books` folder.
   - Create a `authors.service.js` file in the `src/authors` folder.
   - Create a `genres.service.js` file in the `src/genres` folder.
   - Implement the service functions for the books, authors, and genres resources.
9. Create a `utils` folder with the following files:
   - `utils.js`