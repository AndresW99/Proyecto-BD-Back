const { Sequelize } = require('sequelize');

// Conexion a la base MSSQL
const db = new Sequelize('Cafeteria', process.env.SQL_NAME, process.env.SQL_PASS, {
    host: 'localhost' || process.env.PORT,
    dialect: 'mssql',
    // logging: false,
});

module.exports = db;