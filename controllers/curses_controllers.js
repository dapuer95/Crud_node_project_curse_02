const Curso = require('../models/curso_model');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    curseTitle : Joi.string()
        .min(3)
        .max(15)
        .required(),

    curseDescription : Joi.string()
        .min(3)
        .max(100)
});


const createCurse = async(req, res) => {
    const {titulo, descripcion} = req.body;
    const autor = req.usuario._id;

    const curso = await Curso.findOne({'titulo' : titulo});
    if(curso){
        return res.json({'msj' : 'El curso ya ha sido registrado previamente'});
    }

    const{error, value} = schema.validate({curseTitle : titulo, curseDescription: descripcion});

    if(!error){
        const curse = await Curso.create({
            titulo,
            autor ,
            descripcion
        });
        res.send(curse);
    }else{
        res.status(400).json({'error msj' : error.details[0].message});
    }
};

const curseList = async(req, res) => {
    const curses = await Curso.find({'estado':true})
        .populate('autor', 'nombre -_id')
        .sort({titulo:1})
        .select({titulo:1, descripcion:1, estado:1, autor:1,  _id:0});
    res.send(curses);
};

const curseById = async(req, res) => {
    const {curseId} = req.params;
    const curse = await Curso.findById(curseId)
        .select({titulo:1, descripcion:1, _id:0});
    res.send(curse);
};


module.exports = {createCurse, curseList, curseById};