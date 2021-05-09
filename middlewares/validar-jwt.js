const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {

    // Extraemos el token de los headers
    const token = req.header('x-token');

    // Verificamos que haya un token en la peticion
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        // Verifica si es un JWT
        const { uid } = jwt.verify( token, process.env.SECRET_KEY );

        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findByPk( uid );

        // Usuario no existe en la DB
        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }

        // Verifica si el uid no esta marcado como eliminado de la DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}

