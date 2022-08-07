const mongoose = require('mongoose')


const CategoriaMaterialSchema = mongoose.Schema({
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
    creado: {
        type: Date,
        default: Date.now(),
    },
})

const CategoriaMaterial = mongoose.models.CategoriaMaterial || mongoose.model('CategoriaMaterial', CategoriaMaterialSchema)

export default CategoriaMaterial

