const fs = require('fs');
const natural = require('natural');

module.exports = function(req, res) {
  if (req.method === 'POST') {
    try {
      // Asegúrate de que el cuerpo de la solicitud contiene el mensaje a clasificar
      const message = req.body.message;
      if (!message) {
        return res.status(400).json({ error: "Falta el mensaje en la solicitud" });
      }

      // Cargar el clasificador desde un archivo
      console.log(`Directorio de trabajo actual: ${process.cwd()}`);
      const classifier = natural.BayesClassifier.restore(
        JSON.parse(fs.readFileSync('./src/app/model.json', 'utf8'))
      );

      // Clasificar el mensaje recibido
      const classification = classifier.classify(message);

      // Enviar la clasificación como respuesta
      console.log(classification);
      res.status(200).json({ classification: classification });
    } catch (error) {
      console.error("Error procesando el mensaje: ", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    // Método no permitido
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};