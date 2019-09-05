# Catch Coding Challenge 1
> By Azrul Sudarmin, azrulsudarmin@gmail.com

Order data cloner on the fly with event-stream to handling large dataset to prevent heap out of memory. 

## Repo URLs
- HTTPS: https://github.com/AzrulSudarmin/catch-coding-challenge1.git

## Dependency
1. PostgreSQL, download link https://www.postgresql.org/download
2. Nodejs, dwonload link https://nodejs.org/en/download
3. Mocha for unit testing, `npm install mocha -g`
4. Install knex, `npm install knex -g`

## Installation
1. Clone the repo (see Repo URLs).
2. Navigate to root project directory.
3. Install NPM depencencies `npm install`.
4. Create database in postgresql
5. Copy config file in config/config.json.example to config/config.json
6. Edit config/config.json based on your local setup especially database
7. Migrate database `npm run migrate`


## How To run
```js
npm start
```

After running start command the application will be download jsonl file from source that specified in config.json file to storage folder. After download finish, applicatoin will be convert the file to csv format and store directly to database.
After that REST API will be serve at http://localhost:300

## Unit Testing

To validate csv files according on https://csvlint.io/ format . Run this syntax:
```js
npm test
```

## The Architecture
The main application separated in two files:
- [cloner.js](#cloner.js). A nodejs application to handle download and write csv file and download jsonl files that specified in **config.json** with stream feature to store it directly to **storage/order.jsonl**. After file downloaded, the application will start to read the file line by line and streaming it to create **csv file** and also directly store to database
- [server.js](#server.js). REST API to show result order from database. Response format will be serve as a JSON. After running server.js the application can be access via http://localhost:3000