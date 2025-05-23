# Chegg Books Mock 1

## Description
This repo is setup to practice for the the back-end web development mock interview.  
- This is an extension of the Chegg Books API from Module 3.9.6 Assessment.
- This is a complete end-to-end setup to practice a full setup, build and deployment of an API service using node, express and postgresql.

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
1. Review requirements and setup project structure.  Context:  Replicate and extend the chegg_books project from the Chegg Skills curriculum.
   - Create flow diagram with lucidchart. (_Simulate_)
     - This would usually be in cooperation with frontend developers/team as well.
   - Create a Trello board.  (_Simulate_)
     - This would be used to identify tasks, organize work and estimate effort, and track progress.
   - Create a database ERD with lucidchart. (_Simulate_)
     - I would normally use an AI assistant to create the ERD starter, and chose to use lucidchart for this project.
2. Pre-work
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
Branch: `base-api-setup`
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
1. Create an `app.js` file:  Branch: `base-api-setup`
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
2. Setup the basic API routes in the `app.js` file.  Branch: `base-api-setup`
    ```javascript
   app.get("/", (req, res) => {
     res.send("Hello!  Welcome to the Books and Authors API Query Service!");
   });
    ```
3. Create a `server.js` file.  Branch: `base-api-setup`
    ```javascript 
   require('dotenv').config();
   
   const { PORT = 5020 } = process.env;
   
   const app = require('./app');
   
   app.listen(PORT, () => {
         console.log(`Server is listening on port http://localhost:${PORT}`);
   });
   ```
4. Run the application:  Branch: `base-api-setup`
    ```bash
   npm start // production
   npm run start:dev // development
   ```
5. Navigate to `localhost:5020` in your browser. --> Should see the message above in the browser.

### Setup Basic API Service for /books
Goals:
- [x] Setup a `/books` route with basic methods:  `GET`, `POST`, `GET` with aggregates
- [x] Setup a `/books/:bookId` route with basic methods:  `GET`, `PUT`, `DELETE`.
- [x] Setup a `/authors` route with basic methods: `GET`, `POST` 
- [x] Setup a `/authors/:authorId` route with basic methods: `GET`, `PUT`, `DELETE`
- [x] Validate in local DEV (docker) environment.
- [ ] Deploy to production environment.
- [ ] Validate in production environment.

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
1. Setup knex and postgres DB. [Module 3.10.2: Knex Configuration](https://students.skills.chegg.com/curriculum/BACK_END-501/be-backend-web-development/be-node-express-and-postgres/be-knex-configuration)
    - Install knex with postgres:  `npm install knex pg`
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
4. Setup DB `connection.js` file [Module 3.10.3: Connecting to the database with Knex](https://students.skills.chegg.com/curriculum/BACK_END-501/be-backend-web-development/be-node-express-and-postgres/be-connecting-to-the-database-with-knex)
    - Create a `db` under the `src` folder and create the a `connection.js` file in the `db` folder. Branch: `add-knex-integration`
    - Update the `connection.js` file to include the database connection.  Branch: `add-knex-integration`
      ```javascript
       const env = process.env.NODE_ENV || "development";
       const config = require("../../knexfile")[env];
       const knex = require("knex")(config);
       
       module.exports = knex;
      ```
5. Use `knex` to create migrations files for the tables. In this order due to relations.  Refer to `setup/Notes.md` and ERD for more info... [Module 3.10.4: Migrations with Knex](https://students.skills.chegg.com/curriculum/BACK_END-501/be-backend-web-development/be-node-express-and-postgres/be-migrations-with-knex)
    Branch: `update-knex-migration-files`
    - Use `npx knex migrate:make createGenresTable` to create the `genres` migration file.
    - Use `npx knex migrate:make createAuthorsTable` to create the `authors` migration file.
    - Use `npx knex migrate:make createBooksTable` to create the `books` migration file.
    - Use `npx knex migrate:make createBooks_GenresTable` to create the `books_genres` migration file.
    - Should be four files listed when running `npx knex migrate:list`.
      
      ```bash
       : npx knex -- migrate:list
       Using environment: development
       No Completed Migration files Found.
       Found 4 Pending Migration file/files.
       20250102002758_createGenresTable.js
       20250102003004_createAuthorsTable.js
       20250102003013_createBooksTable.js
       20250102003025_createBooks_GenresTable.js
      ```
6. Update the migrations files with table schema.
    - Update the `up` and `down` functions in the migration files to create and drop the tables.
    - Use `npx knex -- migrate:latest` to run the migrations.

      ```bash
        : npx knex -- migrate:latest
        Using environment: development
        Batch 1 run: 4 migrations 
      ```
    - Initially I was running into this error, and it was due to not properly defining the book_id and genre_id as foreign keys in the createBooksTable file.
      
      ```bash
        : npx knex -- migrate:latest
        Using environment: development
        migration file "20250102003013_createBooksTable.js" failed
        migration failed with error: table.foreign(...).references(...).inTable is not a function
        table.foreign(...).references(...).inTable is not a function
        TypeError: table.foreign(...).references(...).inTable is not a function
        at TableBuilder._fn (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/src/db/migrations/20250102003013_createBooksTable.js:13:14)
        at TableBuilder.toSQL (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/schema/tablebuilder.js:48:16)
        at SchemaCompiler_PG.build (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/schema/compiler.js:144:23)
        at SchemaCompiler_PG.createTable (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/schema/compiler.js:165:13)
        at SchemaCompiler_PG.toSQL (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/schema/compiler.js:97:26)
        at SchemaBuilder.toSQL (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/schema/builder.js:36:45)
        at ensureConnectionCallback (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/execution/internal/ensure-connection-callback.js:4:30)
        at Runner.ensureConnection (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/execution/runner.js:318:20)
        at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
        at async Runner.run (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/execution/runner.js:30:19)
      ```
   - Successful migration run...
      
      ```bash
        : npx knex -- migrate:latest
        Using environment: development
        Batch 1 run: 4 migrations 
        Error: relation "books_genres" does not exist
      ```
   - Check the database to ensure the tables were created.
7. Use `knex` to create seed files for the tables. [Module 3.10.5: Seeding Data with Knex](https://students.skills.chegg.com/curriculum/BACK_END-501/be-backend-web-development/be-node-express-and-postgres/be-seeding-data-with-knex)
    Branch: `add-knex-seed-files`
    - Use `npx knex seed:make 00-genres` to create the `genres` seed file.
    - Use `npx knex seed:make 01-authors` to create the `authors` seed file.
    - Use `npx knex seed:make 02-books` to create the `books` seed file.
    - Use `npx knex seed:make 03-books_genres` to create the `books_genres` seed file.
    - Update the seed files with require to the location of the seeded data: `src/db/fixtures/seed_data.sql`.
8. Create the seed files with sample data.  Going to use the `fixtures` folder name for the seed data.
    - Update the seed files in `fixtures` with sample data.
      - I used chatGPT to help convert the `setup` sql files to seed data.
      - I ran into an error as I missed adding the `in_stock`to the books table.
         - `column "in_stock" of relation "books" does not exist`
      - I created another migration file to include the `in_stock` column.
        
        ```bash
         : npx knex migrate:make add_in_stock_to_books
         Using environment: development
         Using environment: development
         Using environment: development
         Created Migration: /Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/src/db/migrations/20250102031654_add_in_stock_to_books.js
        ```
      - Updated the `20250102031654_add_in_stock_to_books.js` file to include the `in_stock` column.
        
        ```javascript
         exports.up = function(knex) {
           return knex.schema.table('books', (table) => {
               table.boolean('in_stock').defaultTo(true);
           });
         };
     
         exports.down = function(knex) {
           return knex.schema.table('books', (table) => {
             table.dropColumn('in_stock');
           });
         };
        ```
      - This resolved the error for `in_stock` but I ran into another error for `publication_year`.
         - `column "publication_year" of relation "books" does not exist`
      - I created another migration file to include the `publication_year` column.
        
        ```bash
         : npx knex migrate:make add_publication_year_to_books
         Using environment: development
         Using environment: development
         Using environment: development
         Created Migration: /Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/src/db/migrations/20250102031854_add_publication_year_to_books.js
        ```
      - Another column error encountered. `column "title" of relation "books" does not exist`
      - I created another migration file to include the `title` column.
       
        ```bash
        : npx knex migrate:make add_title_to_books
        Using environment: development
        Using environment: development
        Using environment: development
        Created Migration: /Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/src/db/migrations/20250102032054_add_title_to_books.js
        ```
      - This time I ran into an error due to violating not-null constraint.  `null value in column "book_title" of relation "books" violates not-null constraint`
       
        ```bash
        : npx knex migrate:make rename_book_title_to_title
        Using environment: development
        ```
      - The move to add `title` was not successful.  So, I rolled it back after fixing the missing price and "genre_id" column errors.
        ```bash
         : npx knex migrate:rollback
         Using environment: development
         Batch 4 rolled back: 1 migrations
        ```
9. Run the seed files with `npx knex seed:run`. 
    ```bash
     : npx knex seed:run        
     Using environment: development
     Ran 4 seed files
    ```
10. Validate data exists with DBeaver.
11. Create the service functions for the books, authors, and genres resources. [Module 3.10.6: CRUD with Knex](https://students.skills.chegg.com/curriculum/BACK_END-501/be-backend-web-development/be-node-express-and-postgres/be-crud-with-knex)
     - Implement the service functions for the books, authors, and genres resources.
       - [x] list all books,  Branch: `add-books.service-get`
       - [x] Get a book by id.  Branch: `feature/update-books-with-addtl-services`
       - [x] add a new book, Branch: `feature/update-books-with-addtl-services-2`
       - [x] update a book. Based on `book_id`. `feature/update-book-by-id`
       - [x] delete a book. Based on `book_id`. `feature/delete-book-by-id`
       - [x] Count the number of books. Branch: `feature/add-books-route-services-aggregate-middleware`
       - [x] List the `out-of-stock` books.  Branch: `feature/add-books-route-services-aggregate-middleware`
       - [x] List the `in-stock` books.  Branch: `feature/add-books-route-services-aggregate-middleware`
       - [x] Count the number of `in_stock` books.  Branch: `feature/add-books-route-services-aggregate-middleware`
       - [x] Count the number of `out-of-stock` books.  Branch: `feature/add-books-route-services-aggregate-middleware`
       - [x] list all authors. (Using flat-file data to validate initial route setup.)
       - [x] list all authors (knex)  Branch: `feature/update-authors-list-knex`
       - [x] Get an author by id. (knex)  Branch: `feature/update-authors-list-knex`, `feature/add-authors-create-update-delete-support`
       - [x] add a new author. Branch: `feature/add-authors-create-update-delete-support`
       - [x] update an author.  Branch: `feature/add-authors-create-update-delete-support`
       - [x] delete an author.  Branch: `feature/add-authors-create-update-delete-support`
       - [ ] list all genres.
       - [ ] Get a genre by id.
       - [ ] add a new genre.
       - [ ] update a genre.
       - [ ] delete a genre.
       - [x] Create a `books.service.js` file in the `src/books` folder.
       - [x] Create a `authors.service.js` file in the `src/authors` folder.  Branch: `feature/add-authors-create-update-delete-support`
       - [ ] Create a `genres.service.js` file in the `src/genres` folder.

### Deploy to Production
- [x] Update the `knexfile.js` file to include the production configuration.
    - I re-used the existing render hosted `PROD` database for this project.    
- [x] Update the `.env` file to store the production database connection string.
- [x] Run the migrations on the production environment.
    - Initial knex migration errored due to missing migration files on the shared production database.  I had to copy migration files from `node, express, postgres` and the `cors` module.
      ```bash
      : NODE_ENV=production npx knex migrate:list
      Using environment: production
      The migration directory is corrupt, the following files are missing: 20241213193233_createSuppliersTable.js, 20241213194941_createProductsTable.js, 20241213204943_createCategoriesTable.js, 20241213205201_createProductsCategoriesTable.js, 20241213222635_productsAddPriceAndChangeProductNameToProductTitle.js, 20201213083928_createArticlesTable.js
      Error: The migration directory is corrupt, the following files are missing: 20241213193233_createSuppliersTable.js, 20241213194941_createProductsTable.js, 20241213204943_createCategoriesTable.js, 20241213205201_createProductsCategoriesTable.js, 20241213222635_productsAddPriceAndChangeProductNameToProductTitle.js, 20201213083928_createArticlesTable.js
      at validateMigrationList (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/migrations/migrate/Migrator.js:567:11)
      at Migrator.list (/Users/joe/github/kernel528/Chegg-Skills/Projects/Backend-Web-Dev/Mock Interview Prep/chegg-books-mock/node_modules/knex/lib/migrations/migrate/Migrator.js:285:7)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      
      : cp ~/github/kernel528/Chegg-Skills/starters/starter-node-express-postgresql/src/db/migrations/20241213* ./src/db/migrations 
      : cp ~/github/kernel528/Chegg-Skills/starters/starter-tracing-back-end/src/db/migrations/20201213083928_createArticlesTable.js ./src/db/migrations 

      : NODE_ENV=production npx knex migrate:list                                                                                                       
      Using environment: production
      Found 6 Completed Migration file/files.
      20241213193233_createSuppliersTable.js
      20241213194941_createProductsTable.js
      20241213204943_createCategoriesTable.js
      20241213205201_createProductsCategoriesTable.js
      20241213222635_productsAddPriceAndChangeProductNameToProductTitle.js
      20201213083928_createArticlesTable.js
      Found 7 Pending Migration file/files.
      20250102002758_createGenresTable.js
      20250102003004_createAuthorsTable.js
      20250102003013_createBooksTable.js
      20250102003025_createBooks_GenresTable.js
      20250102031654_add_in_stock_to_books.js
      20250102032659_add_publication_year_to_books.js
      20250102033001_add_title_to_books.js
      
      : NODE_ENV=production npx knex migrate:latest
      Using environment: production
      Batch 3 run: 7 migrations

      ```
- [x] Run the seed files on the production environment.

    ```bash
     : NODE_ENV=production npx knex seed:run
    ```
    - I forgot to remove the `add_title_to_books.js` migration.  So, had to rollback and then remove migration file, then re-run.
      
      ```bash
      : NODE_ENV=production npx knex migrate:rollback
      Using environment: production
      Batch 3 rolled back: 7 migrations
      
      : mv src/db/migrations/20250102033001_add_title_to_books.js ./
      : NODE_ENV=production npx knex migrate:list                   
      Using environment: production
      Found 6 Completed Migration file/files.
      20241213193233_createSuppliersTable.js
      20241213194941_createProductsTable.js
      20241213204943_createCategoriesTable.js
      20241213205201_createProductsCategoriesTable.js
      20241213222635_productsAddPriceAndChangeProductNameToProductTitle.js
      20201213083928_createArticlesTable.js
      Found 6 Pending Migration file/files.
      20250102002758_createGenresTable.js
      20250102003004_createAuthorsTable.js
      20250102003013_createBooksTable.js
      20250102003025_createBooks_GenresTable.js
      20250102031654_add_in_stock_to_books.js
      20250102032659_add_publication_year_to_books.js
      
      : NODE_ENV=production npx knex migrate:latest
      Using environment: production
      Batch 3 run: 6 migrations
      
      : NODE_ENV=production npx knex seed:run                       
      Using environment: production
      Ran 4 seed files

      ``` 
    - Confirmed with DBeaver the data was seeded.
- [x] Deploy the application to a production server.
    - Logged into render dashboard and create a new web service.
    - Attached to my kernel528/chegg-books-mock repo.
    - Name:  `kernel528-chegg-books-mock` 
    - Build Command: `npm install`
    - Start Command: `npm start`
    - Set the environment variables for the production database.
      - key: `PRODUCTION_DATABASE_URL`
      - value: `take from .env file...`
    - Click on the free tier option.
    - Click on `Deploy Web Service`
    - Validation application at https://kernel528-chegg-books-mock.onrender.com/
      - Can check routes such as: https://kernel528-chegg-books-mock.onrender.com/books
      - Can check routes such as: https://kernel528-chegg-books-mock.onrender.com/authors
      - Can check routes such as: https://kernel528-chegg-books-mock.onrender.com/total-books
      - Can check routes such as: https://kernel528-chegg-books-mock.onrender.com/in-stock
- [x] Test the application in the production environment.
