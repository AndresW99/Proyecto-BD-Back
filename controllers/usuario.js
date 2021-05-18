/*
    path: /api/usuarios
*/

const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const obtenerUsuarios = async( req, res = response ) => {

    // Buscamos a los usuarios
    const usuarios = await Usuario.findAll({
        where: {
            estado: true
        }
    });

    res.json( {usuarios} );

}

const obtenerUsuariosPorId = async( req, res = response ) => {

    // Extraemos el id de los params
    const { id } = req.params; 

    // Buscmaos al usaurio por su id
    const usuario = await Usuario.findByPk( id );

    // Si el usuario esta inactivo no lo muestra
    if( usuario.estado === false ) {
        return res.status(400).json({
            msg: `El usuario con el id ${ id } esta inactivo`
        });
    }

    // Validamos que exista el id
    if ( !usuario ) {
        return res.status(400).json({
            msg: `No existe el usuario con el id: ${ id }`
        });
    }

    res.json( usuario );

}

const actualizarUsuario = async( req, res = response ) => {

    const { id } = req.params;
    // Extraemos los campos que no queremos que se puedan actualizar
    const { estado, rol, contrasenia, ...resto } = req.body;
    
    try {

        // Busca al usuario por su id en la BD 
        const usuario = await Usuario.findByPk( id );
        // Si el usuario no existe devuelve error 404
        if( !usuario ) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        // Encriptamos la contra al actualizar
        if ( contrasenia ) {
            const salt = bcryptjs.genSaltSync();
            resto.contrasenia = bcryptjs.hashSync( contrasenia, salt );
        }

        // Actualizamos los datos que estan en nuestro modelo
        await usuario.update( resto );

        res.json( usuario );

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarUsuario = async( req, res = response ) => {

    const { id } = req.params;

    // Busca al usuario por su id en la BD 
    const usuario = await Usuario.findByPk( id );
    // Si el usuario no existe devuelve error 404
    if( !usuario ) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    // Eliminacion logica
    await usuario.update({ estado: false });

    res.json( usuario );

}

module.exports = {
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuarios,
    obtenerUsuariosPorId,
}