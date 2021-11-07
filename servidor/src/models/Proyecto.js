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
  terminacion: {
    type: Date
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
    default: false,
    required: true
  },
  fase: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Proyecto', ProyectosSchema);