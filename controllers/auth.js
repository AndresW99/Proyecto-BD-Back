const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const crearUsuario = async( req, res = response ) => {

    const { nombre, correo, contrasenia } = req.body;

    try {

        // Buscara si ya existe alguien con ese correo
        const existeCorreo = await Usuario.findOne({
            where: {
                correo: correo
            }
        });

        // Si ya existe alguien con ese correo no continua
        if( existeCorreo ) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el correo: ' + correo
            });
        }

        // Creamos el nuevo usuario
        const usuario = new Usuario( req.body );

        // Encriptar la contraseña
        // El salt es el numero de vueltas que data el hash - por defecto es 10
        const salt = bcryptjs.genSaltSync();
        usuario.contrasenia = bcryptjs.hashSync( contrasenia, salt );
        
        // Guarda al usuario
        await usuario.save();
        
        // Generar JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            contrasenia: usuario.contrasenia,
            estado: usuario.estado,
            rol: usuario.rol,
            token
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}

const loginUsuario = async( req, res = response ) => {

    const { correo, contrasenia } = req.body;

    try {

        // Verificar si el correo existe en la DB
        const usuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        })

        // Si no existe lanza error
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }

        // Verificar si el usuario esta activo
        if( usuario.estado === false ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validarContra = bcryptjs.compareSync( contrasenia, usuario.contrasenia );
        if ( !validarContra ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            ok: true,
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            contrasenia: usuario.contrasenia,
            estado: usuario.estado,
            rol: usuario.rol,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const revalidarToken = async( req, res = response ) => {

    const { usuario } = req;

    const token = await generarJWT( usuario.id);

    res.json({
        ok: true,
        id: usuario.id,
        nombre: usuario.nombre,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}