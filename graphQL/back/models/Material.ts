const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const MaterialSchema = mongoose.Schema({
    nombre: {
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
    usuario:
    {
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
MaterialSchema.plugin(mongoosePaginate)
const Material = mongoose.models.Material || mongoose.model('Material', MaterialSchema)

export default Material

