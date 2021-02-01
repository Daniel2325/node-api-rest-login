const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let informacion = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El e-mail es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    caja: {
        type: Number,
        required: [true, "El campo caja es obligatorio"]
    },
    fecha: {
        type: String,
        required: [true, "La fecha es obligatoria"]
    },
    anio: {
        type: String,
        required: [true, 'El anio es obligatorio']
    },
    mes: {
        type: String,
        required: [true, 'El mes es obligatorio']
    },
    dia: {
        type: String,
        required: [true, 'El dia es obligatorio']
    },
    hora: {
        type: String,
        required: [true, "La hora es oblgatorio"]
    }
})
informacion.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

informacion.methods.toJSON = function () {
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;

    return userObjet;
}

module.exports = mongoose.model('Caja', informacion)