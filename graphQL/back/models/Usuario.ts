const mongoose = require('mongoose')


const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  rol: {
    type: String,
    default: 'VERIFICACION',
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
})

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', UsuariosSchema)

export default Usuario

// module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuariosSchema)