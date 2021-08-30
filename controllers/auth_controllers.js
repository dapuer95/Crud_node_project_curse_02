const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const Usuario = require('../models/user_model');


const autentificacion = async(req, res) => {
    const {email, password} = req.body;

    const usuario = await Usuario.findOne({'email' : email});

    if(usuario) {
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(validPassword) {
            const jwToken = jwt.sign({
                usuario : {_id: usuario._id, nombre: usuario.nombre, email: usuario.email}
            }, config.get('jwtConfig.SEED'), {expiresIn : config.get('jwtConfig.EXPIRATION')});
            res.json({
                user : {
                    _id  : usuario._id,
                    nombre : usuario.nombre,
                    email : usuario.email
                },
                jwToken
            });
        }else{
            res.json({msj : 'Clave invalida'});
        }
    }else{
        res.json({msj : 'Email invalido'});
    }

};


module.exports = autentificacion;
