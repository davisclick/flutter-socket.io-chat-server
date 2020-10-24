const jwt = require ('jsonwebtoken');

const validateJWT = ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request'
        });
    }

    try {
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }

    

}

module.exports  = {
    validateJWT
}