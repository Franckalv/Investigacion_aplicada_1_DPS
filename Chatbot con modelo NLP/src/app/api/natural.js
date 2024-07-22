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
      let reply = '';
      switch (classification) {
        case 'saludo':
          reply = '¡Hola! Estoy aqui para aclarar cualquier duda que tengas de la UDB ¿En qué puedo ayudarte?';
          break;
        case 'calendarioSemestre':
          reply = 'El calendario académico de la universidad se encuentra en el siguiente enlace: https://www.udbvirtual.edu.sv/calendario';
          break;
        case 'horarioPersonalClase':
          reply = 'Tu horario de clases puedes encontrarlo en: https://admacad.udb.edu.sv/EstudiantesPlus/MiHorario\nRecuerda iniciar sesión para poder visualizarlo';
          break;
        case 'fechaInscripcion':
          reply = 'Las fechas de inscripciones puedes encontrarla en el calendario académico: https://www.udbvirtual.edu.sv/calendario o en https://www.udb.edu.sv/udb/eventos\n\nAdemás de encontrar el día y hora exactos que te corresponde en: https://admacad.udb.edu.sv/EstudiantesPlus/Home, a la derecha de la página web podrás visualizar el ciclo a inscribir, la fecha y las opciones para ver los horarios y la preinscripción';
          break;
        case 'biblioteca':
          reply = 'En el campus de Soyapango, se encuentra en el edificio VIPE, sus horarios son de Lunes a Viernes 7:00 am a 5:00 pm y el Sábado 8:00 am a 12:00 pm\nEn el campus de antiguo, se encuentra por la entrada, al lado del cafetín. Su horario es de lunes a viernes 7:00 am a 5:00 pm y Sábado 8:00 am a 12:00 pm';
          break;
        case 'contactoServiciosEstudiantiles':
          reply = 'Para contactar a Administración académica, puedes hacer uso del correo: https://www.udb.edu.sv/udb/pagina/gloriahp@udb.edu.sv\nO contactar por teléfono a: Lic. Fátima Villavicencio Gutiérrez, al +503 2527-2300 ext. 129';
          break;
        case 'semanaEvento':
          reply = 'Esta semana no hay eventos.\nLos proximos eventos puedes verlos en https://www.udb.edu.sv/udb/eventos';
          break;
        case 'ayudaEmocional':
          reply = 'Puedes comunicarte con el Departamento de Asistencia Psicopedagógica al Tel. (503) 2251-8200 Ext.1781. \nO a los siguientes correos:\nmlazo@udb.edu.sv\njose.menjivar@udb.edu.sv\ncarmen.perez@udb.edu.sv';
          break;
        case 'recursosDiscapacidad':
          reply = 'La UDB cuenta con el proyecto Sin barreras, una iniciativa de la Asociación de Estudiantes Salesianos en Pensamiento y Educación Ciudadana (AESPEC) y la Asociación Salesiana de Estudiantes en Aeronáutica (ASEA) de la Universidad Don Bosco, con el objetivo de promover la inclusión para las personas con discapacidad auditiva, a través de la enseñanza de lengua de señas ASL a toda persona que esté interesada y romper las barreras de la comunicación.';
          break;
        case 'tutoriaAcademica':
          reply = 'Para consultar quién es tu tutor asignado ingresa al Portal Web con tu usuario y contraseña: https://admacad.udb.edu.sv/EstudiantesPlus/Home , y en la parte inferior central a tu tutor.';
          break;
        case 'pasantias':
          reply = 'Puedes consultar los canales de comunicación de la UDB para conocer de las diversas pasantias o prácticas profesionales que se ofertan en la universidad.\nFacebook: https://www.facebook.com/IncorporateUDB\nLinkedIn:  https://bit.ly/3Kb2pTK\nLanding Page: http://www.udb.edu.sv/udb/pagina/intermediacion-laboral\nApp CDC.UDB: https://play.google.com/store/apps/details?id=udb.edu.sv.cdc\nO contactar a la coordinación del programa incorpórate:\nLicda. Andrea Paola Batlle: incorporate@udb.edu.sv\nTeléfono: 2251-8200 ext. 1777';
          break;
        case 'curriculumRecursos':
          reply = 'A través de la guía de empleabilidad puedes obtener ayuda con tu curriculum:\nhttps://www.udb.edu.sv/udb_files/recursos_archivos/pdf/intermediacion-laboral/guia-de-empleabilidad-2021.pdf\nAdemás de los talleres de empleabilidad, donde se da asesoría para diseñar tu hoja de vida';
          break;
        case 'talleresEntrevistas':
          reply = 'Mediante el programa de orientación de carrera puedes realizar el taller de empleabilidad, donde recibirás asesoría para diseñar tu hoja de vida y como prepárate para una entrevista de trabajo';
          break;
        case 'extracurriculares':
          reply = 'Puedes practicar deporte, forma parte de las actividades deportivas que te ofrece la UDB en las disciplinas de fútbol, futsal, balonmano, baloncesto, voleibol, tenis de mesa, ajedrez, atletismos, natación y Esports en las modalidades de:\nTorneos internos desarrollados ciclo a ciclo.\nJuegos nacionales universitarios.\nJuegos federados.\nTambién El Departamento de Arte y Cultura (DAC) organiza sus actividades y servicios en los siguientes ejes de acción:\nCarteles culturales, Grupos de extensión universitaria, Formación complementaria, Préstamo de recursos, Espacio para el voluntariado y servicio social y La Pinacoteca del Centro de Cultura Rafael Meza Ayau.';
          break;
        case 'eventoFinde':
          reply = 'Este fin de semana no hay eventos.\nLos proximos eventos puedes verlos en https://www.udb.edu.sv/udb/eventos';
          break;
        case 'alimentacion':
          reply = 'La UDB ofrece variedad y diversidad de opciones ya que dispone de varios cafetines en el campus, por lo que podrá seleccionar cualquier opción acorde a su gusto.';
          break;
        default:
          reply = 'Lo siento, no puedo ayudarte con eso.';
      }

      // Enviar la clasificación como respuesta
      console.log(classification);
      res.status(200).json({ classification: classification,
        reply: reply
       });
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