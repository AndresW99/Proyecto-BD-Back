const { response } = require("express");



const usuarioGet = async( req, res = response ) => {

    res.json({ msg: 'Todo ok' });

}

const usuarioPut = async( req, res = response ) => {

    res.json({ msg: 'UsuarioPut - Ok' });

}

const usuarioPost = async( req, res = response ) => {

    // Recibimos losd datos que envian en el body
    const { nombre, correo, pass, rol } = req.body;

    res.json({
        nombre
    });

}

const usuarioDelete = async( req, res = response ) => {

    res.json({ msg: 'UsuarioDelete - Ok' });

}


module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete
}