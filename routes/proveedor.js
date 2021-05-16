/*
    path: /api/proveedor
*/

const { Router } = require('express');
// const { check } = require('express-validator');

const { crearProveedor,
        actualizarProveedor,
        eliminarProveedor } = require('../controllers/proveedor');

const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear proveedor
router.post( '/', crearProveedor );

//Obtener proveedores
router.get('/', );

// Actualizar proveedor
router.put('/:id', [ validarCampos ], actualizarProveedor);

// Eliminación de proveedor
router.delete('/:id', [ validarCampos ], eliminarProveedor );


module.exports = router;