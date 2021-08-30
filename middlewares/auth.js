const jwt = require('jsonwebtoken');
const config = require('config');

const verificarToken = (req, res, next) => {
    try {
        const token = req.get('Authorization'); //se recuperea asi porque se envia en el header de la peticion

        jwt.verify(token, config.get('jwtConfig.SEED'), (err, decoded) => {
            if(err){
                return res.status(401).json({err});
            }
            req.usuario = decoded.usuario;
        });
        next();
    } catch (error) {
        res.send(error);
    }
   
    
};

module.exports = verificarToken;