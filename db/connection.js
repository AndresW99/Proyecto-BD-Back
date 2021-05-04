const { Sequelize } = require('sequelize');

// Conexion a la base MSSQL
const db = new Sequelize('Tarea', process.env.SQL_NAME, process.env.SQL_PASS, {
    host: 'localhost',
    dialect: 'mssql',
    // logging: false,
});

module.exports = db;