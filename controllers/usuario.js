/*
    path: /api/usuarios
*/

const { response } = require('express');
const Usuario = require('../models/usuario');

// Crear usuario
const usuarioPost = async( req, res = response ) => {

    // Recibimos los datos que envian en el body
    const { nombre, correo, password } = ( req.body );

    if( nombre.length < 5 ) {
        return res.status(400).json({
            ok: false,
            msg: 'El nombre debe tener minimo 5 letras'
        });
    }

    res.json({
        ok: true,
        nombre,
        correo,
        password
    });

}

const obtenerUsuarios = async( req, res = response ) => {

    // Buscamos a los usuarios
    const usuarios = await Usuario.findAll();

    res.json( {usuarios} );

}

const obtenerUsuariosPorId = async( req, res = response ) => {

    const { id } = req.params; 

    const usuario = await Usuario.findByPk( id );

    // Validamos que exista el id
    if ( !usuario ) {
        return res.status(400).json({
            msg: `No existe el usuario con el id: ${ id }`
        });
    }

    res.json( usuario );

}

module.exports = {
    usuarioPost,
    obtenerUsuarios,
    obtenerUsuariosPorId,
}