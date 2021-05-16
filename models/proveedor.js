const { DataTypes } = require('sequelize');
const db = require('../db/connection');

// Protege de inyecciones SQL o de envio incorrecto de informacion

const Proveedor = db.define('Proveedore', {

    nombre: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
    },
    disponible: {
        type: DataTypes.BOOLEAN,
    },
}, {
    createdAt: false,
    updatedAt: false,
});

module.exports = Proveedor;

