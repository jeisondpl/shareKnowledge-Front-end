const mongoose = require('mongoose')


const CursoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Categoria'
  },
  material: {
    type: Array,
    required: true,
    // ref: 'Material',
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario',
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
})

const Cursos = mongoose.models.Cursos || mongoose.model('Cursos', CursoSchema)

export default Cursos

