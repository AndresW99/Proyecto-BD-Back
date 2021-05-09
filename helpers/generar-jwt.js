const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') => {

    // JWT de momento solo trabaj en base a promesas, asi que creamos una.
    return new Promise( ( resolve, reject ) => {

        // grabamos en el payload del token el uid del usuario
        const payload = { uid };

        // Generamos JWT
        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '24h'
        }, (err, token ) => {
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }
        });
    }); 
}

module.exports = {
    generarJWT
}
