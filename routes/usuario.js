const { Router } = require('express');

const { usuarioGet,
        usuarioPut,
        usuarioPost,
        usuarioDelete } = require('../controllers/usuario');

const router = Router();

router.get('/', usuarioGet );

router.put('/:id', usuarioPut );

router.post('/', usuarioPost );

router.delete('/:id', usuarioDelete );

module.exports = router;