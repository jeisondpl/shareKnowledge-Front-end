const mongoose = require('mongoose')


const MaterialSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario',
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Categoria'
    },

    creado: {
        type: Date,
        default: Date.now(),
    },
})

const Material = mongoose.models.Material || mongoose.model('Material', MaterialSchema)

export default Material

