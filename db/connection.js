const { Sequelize } = require('sequelize');

// Connection to MSSQL
const db = new Sequelize('Cafeteria', process.env.SQL_NAME, process.env.SQL_PASS, {
    host: 'localhost',
    dialect: 'mssql',
    // logging: false,
});

module.exports = db;