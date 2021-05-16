const { DataTypes } = require('sequelize');
const Usuario = require('../models/usuario');
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
    usuario: {
        type: Usuario,
        references: 'Usuario'
    }
}, {
    createdAt: false,
    updatedAt: false,
});

module.exports = Proveedor;

