const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000; // Puedes elegir el puerto que prefieras

// Importar el manejador de la ruta '/api/natural'
const naturalHandler = require('./src/app/api/natural.js');

app.use(cors({
  origin: 'http://localhost:3001' // Permite solo solicitudes de este origen
}));

app.use(bodyParser.json()); // para parsear application/json

// Ruta para manejar POST a '/api/natural'
app.post('/api/natural', naturalHandler);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});