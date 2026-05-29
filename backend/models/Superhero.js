const mongoose = require('mongoose');

const superheroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  nombreReal: { type: String },
  añoAparicion: { type: Number },
  casa: { type: String, enum: ['Marvel', 'DC'], required: true },
  biografia: { type: String },
  equipamiento: { type: String },
  imagenes: { type: [String], required: true, validate: [v => v.length > 0, 'Debe tener al menos una imagen'] }
});

module.exports = mongoose.model('Superhero', superheroSchema);
