const mongoose = require('mongoose')


const CategoriaSchema = mongoose.Schema({
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

const Categoria = mongoose.models.Categoria || mongoose.model('Categoria', CategoriaSchema)

export default Categoria

