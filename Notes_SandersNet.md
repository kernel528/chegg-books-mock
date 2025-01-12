# Setup Notes for SandersNetwork

## Pre-Setup:  Database
- Setup a docker swarm stack for postgres v16 on docker swarm cluster.  Using kernel582/postgres:16
- Database Setup:
  ```aiignore
  Database Name:  chegg_books_dev
  Hostname:  swarm-m3 (as of initial deploy)
  Username/Password:  Check in secret store location.
  ```

## Setup
- Sync code from github
- Install modules: `npm install`
- Setup `.env` file.
- Start development express server:  `npm run start:dev`
- Confirm connectivity with `npx knex migrate:list`
- Assuming no issues, run `npx knex migrate:latest`

  ```bash
    : npx knex migrate:latest
    Using environment: development
    Batch 1 run: 12 migrations
  ```
- Seed data:  `npx knex seed:run`
    ```bash
    : npx knex seed:run
    Using environment: development
    Ran 4 seed files
  ```
- Open in Browser or Postman to:
    ```bash
    http://localhost:PORT/authors
    http://localhost:PORT/books  
  ```
  - Should get some results back listing authors and books.  Check README for other route to test.