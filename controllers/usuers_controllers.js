const Usuario = require('../models/user_model');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    userName : Joi.string()
        .min(3)
        .max(15)
        .required(),

    userPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    userEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});


const createUser = async(req, res) => {
    const {nombre, email, password} = req.body;

    const usuario = await Usuario.findOne({'email' : email});
    if(usuario){
        return res.json({'msj' : 'El usuario ya ha sido registrado previamente'});
    }

    const{error, value} = schema.validate({userName : nombre, userEmail: email});

    if(!error){
        const user = await Usuario.create({
            nombre,
            email,
            password : bcrypt.hashSync(password, 10)
        });
        res.send(user);
    }else{
        res.status(400).json({'error msj' : error.details[0].message});
    }
};

const userList = async(req, res) => {
    const users = await Usuario.find({'estado':true})
        .sort({nombre:1})
        .select({nombre:1, email:1, estado:1, _id:0});
    res.send(users);
};

const userById = async(req, res) => {
    const {userId} = req.params;
    const user = await Usuario.findById(userId)
        .select({nombre:1, email:1, _id:0});
    res.send(user);
};

const updateUser = async(req, res) => {
    const {userId} = req.params;
    const {nombre, email} = req.body;
    await Usuario.updateOne({_id : userId}, {
        $set: {
            nombre,
            email
        }
    });

    const update = await Usuario.findById(userId)
    .select({nombre:1, email:1, _id:0});

    res.json({msj: 'El usuario ha sido actulizado', data: update});
};

const changeState = async(req, res) => {
    const {userId} = req.params;
    await Usuario.updateOne({_id : userId}, {
        $set: {
            estado : false
        }
    });

    const update = await Usuario.findById(userId)
    .select({nombre:1, email:1, estado:1, _id:0});

    res.json({msj: 'El estado del usuario ha sido actulizado', data: update});
};

module.exports = {createUser, userList, userById, updateUser, changeState};