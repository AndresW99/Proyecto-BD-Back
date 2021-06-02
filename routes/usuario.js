/*
    path: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerUsuarios,
        obtenerUsuariosPorId, 
        actualizarUsuario,
        eliminarUsuario} = require('../controllers/usuario');

const { validarCampos,
        validarJWT,
        esAdminRole } = require('../middlewares');

const router = Router();

//Obtener usuarios
router.get('/', obtenerUsuarios);

// Obtener usuario por ID
router.get('/:id', obtenerUsuariosPorId );

// Actualizar usuario
router.put(
    '/:id', 
    [ 
        validarJWT,
        esAdminRole,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').not().isEmpty(),
        validarCampos 
    ], actualizarUsuario );

// Eliminación de usuarios
router.delete(
    '/:id',
    [ 
        validarJWT, 
        esAdminRole,
        validarCampos,
    ], 
    eliminarUsuario );


module.exports = router;