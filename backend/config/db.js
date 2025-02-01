const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    port: process.env.DB_PORT || 1324,
    password: process.env.DB_PASSWORD || 'chinna123',
    database: process.env.DB_DATABASE || 'recipe',
});

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => {
        console.error('Connection error', err.stack);
        process.exit(1);
    });

module.exports = { client };
