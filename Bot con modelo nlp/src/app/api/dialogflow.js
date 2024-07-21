import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // Replace with your valid access token
      const accessToken = 'TOKEN';

      const dialogflowResponse = await axios.post(
        'https://api.dialogflow.com/v1/query?v=20150910',
        {
          query: message,
          lang: 'es',
          sessionId: '1234567890',
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Check for successful response status code
      if (dialogflowResponse.status === 200) {
        // Parse the JSON data only if response is successful
        res.status(200).json({ reply: dialogflowResponse.data.result.fulfillment.speech });
      } else {
        console.error('Dialogflow API error:', dialogflowResponse.statusText);
        res.status(dialogflowResponse.status).json({ error: 'Error en la solicitud a Dialogflow' });
      }
    } catch (error) {
      console.error('Dialogflow API error:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  } else {
    // Method not supported
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
