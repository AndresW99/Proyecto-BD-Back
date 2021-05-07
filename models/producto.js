const { DataTypes } = require('sequelize');
const db = require('../db/connection');

// Protege de inyecciones SQL o de envio incorrecto de informacion

const Producto = db.define('Producto', {

    nombre: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.NUMBER
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
}, {
    createdAt: false,
    updatedAt: false,
});

module.exports = Producto;