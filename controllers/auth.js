const { response } = require('express');
const Usuario = require('../models/usuario');



const crearUsuario = async( req, res = response ) => {

    const { body } = req;

    try {

        // Buscara si ya existe alguien con ese correo
        const existeCorreo = await Usuario.findOne({
            where: {
                correo: body.correo
            }
        });

        // Si ya existe alguien con ese correo no continua
        if( existeCorreo ) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el correo: ' + body.correo
            });
        }

        // Creamos el nuevo usuario
        const usuario = new Usuario( body );
        await usuario.save();

        res.json( usuario );

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}

const loginUsuario = ( req, res = response ) => {


}

const revalidarToken = ( req, res = response ) => {

    res.json({
        msg: 'token'
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}