const express = require('express');
const router = express.Router();
const Superhero = require('../models/Superhero');

// Obtener todos los superhéroes
router.get('/', async (req, res) => {
  try {
    const superheroes = await Superhero.find();
    res.json(superheroes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un superhéroe por ID
router.get('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) return res.status(404).json({ message: 'Superhéroe no encontrado' });
    res.json(superhero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un superhéroe
router.post('/', async (req, res) => {
  const superhero = new Superhero(req.body);
  try {
    const nuevoSuperhero = await superhero.save();
    res.status(201).json(nuevoSuperhero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un superhéroe
router.put('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!superhero) return res.status(404).json({ message: 'Superhéroe no encontrado' });
    res.json(superhero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un superhéroe
router.delete('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findByIdAndDelete(req.params.id);
    if (!superhero) return res.status(404).json({ message: 'Superhéroe no encontrado' });
    res.json({ message: 'Superhéroe eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
