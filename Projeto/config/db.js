require('dotenv').config();
const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});

db.raw('SELECT 1')
    .then(() => console.log('Database connection established'))
    .catch(err => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });

module.exports = db;
