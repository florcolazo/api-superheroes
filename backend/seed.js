const mongoose = require('mongoose');
const Superhero = require('./models/Superhero');

const mongoURI = 'mongodb://localhost:27017/superheroes_db';

mongoose.connect(mongoURI)
.then(() => console.log('Conectado a MongoDB para Seed'))
.catch(err => console.error('Error conectando a MongoDB', err));

const getImage = (nombre) => [
  `https://robohash.org/${nombre.replace(/\s+/g, '')}.png?set=set2`,
  `https://robohash.org/${nombre.replace(/\s+/g, '')}_2.png?set=set2`
];

const marvelHeroes = [
  { nombre: 'Iron Man', nombreReal: 'Tony Stark', añoAparicion: 1963, casa: 'Marvel', biografia: 'Multimillonario excéntrico con armadura.', equipamiento: 'Armadura Mark' },
  { nombre: 'Spider-Man', nombreReal: 'Peter Parker', añoAparicion: 1962, casa: 'Marvel', biografia: 'Estudiante con poderes arácnidos.', equipamiento: 'Lanzarredes' },
  { nombre: 'Capitán América', nombreReal: 'Steve Rogers', añoAparicion: 1941, casa: 'Marvel', biografia: 'Supersoldado de la Segunda Guerra Mundial.', equipamiento: 'Escudo de Vibranium' },
  { nombre: 'Thor', nombreReal: 'Thor Odinson', añoAparicion: 1962, casa: 'Marvel', biografia: 'Dios del trueno asgardiano.', equipamiento: 'Mjolnir' },
  { nombre: 'Hulk', nombreReal: 'Bruce Banner', añoAparicion: 1962, casa: 'Marvel', biografia: 'Científico irradiado por rayos gamma.', equipamiento: 'Ninguno' },
  { nombre: 'Black Widow', nombreReal: 'Natasha Romanoff', añoAparicion: 1964, casa: 'Marvel', biografia: 'Espía y experta en combate cuerpo a cuerpo.', equipamiento: 'Brazaletes Widow\'s Bite' },
  { nombre: 'Hawkeye', nombreReal: 'Clint Barton', añoAparicion: 1964, casa: 'Marvel', biografia: 'Arquero maestro.', equipamiento: 'Arco y flechas' },
  { nombre: 'Doctor Strange', nombreReal: 'Stephen Strange', añoAparicion: 1963, casa: 'Marvel', biografia: 'Hechicero supremo.', equipamiento: 'Ojo de Agamotto' },
  { nombre: 'Black Panther', nombreReal: 'T\'Challa', añoAparicion: 1966, casa: 'Marvel', biografia: 'Rey de Wakanda.', equipamiento: 'Traje de Vibranium' },
  { nombre: 'Captain Marvel', nombreReal: 'Carol Danvers', añoAparicion: 1968, casa: 'Marvel', biografia: 'Piloto con poderes cósmicos.', equipamiento: 'Ninguno' },
  { nombre: 'Ant-Man', nombreReal: 'Scott Lang', añoAparicion: 1962, casa: 'Marvel', biografia: 'Ladrón que puede encogerse.', equipamiento: 'Traje Ant-Man' },
  { nombre: 'Wasp', nombreReal: 'Hope van Dyne', añoAparicion: 1963, casa: 'Marvel', biografia: 'Heroína con capacidad de volar y encogerse.', equipamiento: 'Traje Wasp' },
  { nombre: 'Scarlet Witch', nombreReal: 'Wanda Maximoff', añoAparicion: 1964, casa: 'Marvel', biografia: 'Mutante con poderes de alteración de la realidad.', equipamiento: 'Ninguno' },
  { nombre: 'Vision', nombreReal: '', añoAparicion: 1968, casa: 'Marvel', biografia: 'Androide sintezoide.', equipamiento: 'Gema de la Mente' },
  { nombre: 'Falcon', nombreReal: 'Sam Wilson', añoAparicion: 1969, casa: 'Marvel', biografia: 'Exmilitar con alas mecánicas.', equipamiento: 'Alas mecánicas EXO-7' },
  { nombre: 'Winter Soldier', nombreReal: 'Bucky Barnes', añoAparicion: 1941, casa: 'Marvel', biografia: 'Soldado con brazo cibernético.', equipamiento: 'Brazo cibernético' },
  { nombre: 'Star-Lord', nombreReal: 'Peter Quill', añoAparicion: 1976, casa: 'Marvel', biografia: 'Líder de los Guardianes de la Galaxia.', equipamiento: 'Blasters' },
  { nombre: 'Gamora', nombreReal: '', añoAparicion: 1975, casa: 'Marvel', biografia: 'La mujer más letal de la galaxia.', equipamiento: 'Espada' },
  { nombre: 'Groot', nombreReal: '', añoAparicion: 1960, casa: 'Marvel', biografia: 'Árbol humanoide.', equipamiento: 'Ninguno' },
  { nombre: 'Rocket Raccoon', nombreReal: '', añoAparicion: 1976, casa: 'Marvel', biografia: 'Mapache modificado genéticamente.', equipamiento: 'Cañón de iones' },
];

const dcHeroes = [
  { nombre: 'Superman', nombreReal: 'Clark Kent', añoAparicion: 1938, casa: 'DC', biografia: 'El último hijo de Krypton.', equipamiento: 'Ninguno' },
  { nombre: 'Batman', nombreReal: 'Bruce Wayne', añoAparicion: 1939, casa: 'DC', biografia: 'Vigilante nocturno de Gotham.', equipamiento: 'Batarang, Batmovil' },
  { nombre: 'Wonder Woman', nombreReal: 'Diana Prince', añoAparicion: 1941, casa: 'DC', biografia: 'Princesa de las Amazonas.', equipamiento: 'Lazo de la Verdad' },
  { nombre: 'Flash', nombreReal: 'Barry Allen', añoAparicion: 1940, casa: 'DC', biografia: 'El hombre más rápido del mundo.', equipamiento: 'Ninguno' },
  { nombre: 'Aquaman', nombreReal: 'Arthur Curry', añoAparicion: 1941, casa: 'DC', biografia: 'Rey de los siete mares.', equipamiento: 'Tridente' },
  { nombre: 'Cyborg', nombreReal: 'Victor Stone', añoAparicion: 1980, casa: 'DC', biografia: 'Mitad hombre, mitad máquina.', equipamiento: 'Partes cibernéticas' },
  { nombre: 'Green Lantern', nombreReal: 'Hal Jordan', añoAparicion: 1940, casa: 'DC', biografia: 'Portador del anillo de poder.', equipamiento: 'Anillo de Poder' },
  { nombre: 'Martian Manhunter', nombreReal: 'J\'onn J\'onzz', añoAparicion: 1955, casa: 'DC', biografia: 'Último superviviente de Marte.', equipamiento: 'Ninguno' },
  { nombre: 'Green Arrow', nombreReal: 'Oliver Queen', añoAparicion: 1941, casa: 'DC', biografia: 'Arquero justiciero.', equipamiento: 'Arco y flechas trucadas' },
  { nombre: 'Shazam', nombreReal: 'Billy Batson', añoAparicion: 1939, casa: 'DC', biografia: 'Niño con poderes mágicos.', equipamiento: 'Ninguno' },
  { nombre: 'Hawkman', nombreReal: 'Carter Hall', añoAparicion: 1940, casa: 'DC', biografia: 'Héroe reencarnado con alas.', equipamiento: 'Maza de metal Nth' },
  { nombre: 'Hawkgirl', nombreReal: 'Kendra Saunders', añoAparicion: 1940, casa: 'DC', biografia: 'Heroína con alas.', equipamiento: 'Maza de metal Nth' },
  { nombre: 'Supergirl', nombreReal: 'Kara Zor-El', añoAparicion: 1959, casa: 'DC', biografia: 'Prima de Superman.', equipamiento: 'Ninguno' },
  { nombre: 'Nightwing', nombreReal: 'Dick Grayson', añoAparicion: 1940, casa: 'DC', biografia: 'Ex compañero de Batman.', equipamiento: 'Bastones de Escrima' },
  { nombre: 'Batgirl', nombreReal: 'Barbara Gordon', añoAparicion: 1961, casa: 'DC', biografia: 'Hija del comisario Gordon.', equipamiento: 'Batarangs' },
  { nombre: 'Zatanna', nombreReal: 'Zatanna Zatara', añoAparicion: 1964, casa: 'DC', biografia: 'Maga heroica.', equipamiento: 'Varita mágica' },
  { nombre: 'Blue Beetle', nombreReal: 'Jaime Reyes', añoAparicion: 1939, casa: 'DC', biografia: 'Héroe con escarabajo alienígena.', equipamiento: 'Traje de Escarabajo' },
  { nombre: 'Booster Gold', nombreReal: 'Michael Jon Carter', añoAparicion: 1986, casa: 'DC', biografia: 'Héroe del futuro.', equipamiento: 'Traje del futuro' },
  { nombre: 'Plastic Man', nombreReal: 'Patrick O\'Brian', añoAparicion: 1941, casa: 'DC', biografia: 'Héroe elástico.', equipamiento: 'Ninguno' },
  { nombre: 'Black Canary', nombreReal: 'Dinah Lance', añoAparicion: 1947, casa: 'DC', biografia: 'Experta en artes marciales.', equipamiento: 'Grito del canario' },
];

const allHeroes = [...marvelHeroes, ...dcHeroes].map(h => ({
  ...h,
  imagenes: getImage(h.nombre)
}));

const seedDB = async () => {
  try {
    await Superhero.deleteMany({});
    console.log('Colección limpiada');
    await Superhero.insertMany(allHeroes);
    console.log('40 Superhéroes creados exitosamente');
    process.exit();
  } catch (err) {
    console.error('Error durante el seed', err);
    process.exit(1);
  }
};

seedDB();
