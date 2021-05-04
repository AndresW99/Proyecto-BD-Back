const { DataTypes } = require('sequelize');
const db = require('../db/connection');

// Protege de inyecciones SQL o de envio incorrecto de informacion

const Usuario = db.define('Usuario', {

    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});

module.exports = Usuario;