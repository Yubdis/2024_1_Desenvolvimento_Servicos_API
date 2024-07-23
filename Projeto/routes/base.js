const errors = require('restify-errors');
const db = require('../config/db');

const handleErrors = (promise) => {
    return promise
        .then(data => [data, null])
        .catch(err => [null, err]);
};

module.exports = { errors, db, handleErrors };
