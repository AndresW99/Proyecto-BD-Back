/*
    path: /api/usuarios
*/

const { Router } = require('express');

const { usuarioPost,
        obtenerUsuarios,
        obtenerUsuariosPorId } = require('../controllers/usuario');

const router = Router();


//Crear usuario
router.post('/', usuarioPost );

//Obtener usuarios
router.get('/', obtenerUsuarios);

// Obtener usuario por ID
router.get('/:id', obtenerUsuariosPorId );


module.exports = router;