const { validationResult } = require('express-validator');

// Valida los campos del express validator (Check)
const validarCampos = ( req, res, next) => {

    // Validamos que los campos no esten vacios
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json( errors );
    }

    next();
}

module.exports = {
    validarCampos
}
