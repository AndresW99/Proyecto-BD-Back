/*
    path: /api/usuarios
*/

const { Router } = require('express');

const { obtenerUsuarios,
        obtenerUsuariosPorId, 
        actualizarUsuario,
        eliminarUsuario} = require('../controllers/usuario');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Obtener usuarios
router.get('/', obtenerUsuarios);

// Obtener usuario por ID
router.get('/:id', [ validarCampos ], obtenerUsuariosPorId );

// Actualizar usuario
router.put('/:id', [ validarCampos ], actualizarUsuario );

// Eliminación de usuarios
router.delete('/:id', [ validarCampos ], eliminarUsuario );


module.exports = router;