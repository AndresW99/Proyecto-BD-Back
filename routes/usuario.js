/*
    path: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerUsuarios,
        obtenerUsuariosPorId, 
        actualizarUsuario,
        eliminarUsuario} = require('../controllers/usuario');
// const { existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Obtener usuarios
router.get('/', obtenerUsuarios);

// Obtener usuario por ID
router.get('/:id', [ validarCampos ], obtenerUsuariosPorId );

// Actualizar usuario
router.put('/:id', [ validarCampos ], actualizarUsuario );

// Eliminación de usuarios
router.delete(
    '/:id',
    [ 
        validarJWT, 
        validarCampos,
    ], 
    eliminarUsuario );


module.exports = router;