# Simple Persistence API with NodeJS and Express

This is a simple API for managing persistent data from a MySQL database built with NodeJS and Express framework.

## Pre-requisites

-   [Node.js](https://nodejs.org/en/)
-   [MySQL 5.7](https://dev.mysql.com/downloads/)

## Getting started

-   Clone the repository

```bash
git clone https://github.com/miklegonza/PersistenceAPI.git
```

-   Install dependencies

```bash
cd PersistenceAPI
npm install
```

-   Create the database with the SQL Script under the db/ folder

-   Create a new file named **.env** and add the following structure

    -   These will be the environmet variables used for connecting with the database. Fill them with your host info

```
DB_HOST = localhost
DB_USER =
DB_PASS =
DB_NAME = taller_persistencia

PORT = 3000
```

-   Run

```bash
npm start
```

Now you can use the API

## Overview

| Method | URL             | Action                                   |
| ------ | --------------- | ---------------------------------------- |
| GET    | /api            | get 'Hello world' to prove that it works |
| GET    | /api/search?id= | get user by `id`                         |
| GET    | /api/list       | get all users                            |
| POST   | /api            | add new user                             |
| PUT    | /api/:id        | update user by `id`                      |
| DELETE | /api/:id        | remove user by `id`                      |

## Project Structure

| Name         | Description                       |
| ------------ | --------------------------------- |
| db/db.sql    | SQL Script to create the Database |
| server.js    | Entry point to Express app        |
| db.js        | Connection to the database        |
| package.json | Contains npm dependencies         |
