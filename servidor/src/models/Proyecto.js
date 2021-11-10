const mongoose = require('mongoose');

const ProyectosSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  objGenerales: {
    type: String,
    trim: true
  },
  objEspecificos: {
    type: String,
    trim: true
  },
  presupuesto: {
    type: Number,
    required: true
  },
  creacion: {
    type: Date,
    default: Date.now()
  },
  duracion: {
    type: Number
  },
  dniLider: {
    type: String,
    required: true,
    trim: true
  },
  nombreLider: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: Boolean,
    default: false
  },
  fase: {
    type: String,
    default: null,
    trim: true
  }
});

module.exports = mongoose.model('Proyecto', ProyectosSchema);