require('dotenv').config();

const db = require('knex')({
    client: 'mssql',
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        options: {
            trustServerCertificate: true,
            enableArithAbort: true,
            encrypt: true,
        },
        port: parseInt(process.env.DB_PORT),
    },
});

module.exports = db;