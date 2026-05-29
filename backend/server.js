const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/superheroes_db';

mongoose.connect(mongoURI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB', err));

const superheroesRoutes = require('./routes/superheroes');
app.use('/api/superheroes', superheroesRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
