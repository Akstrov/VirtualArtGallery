import express from 'express';
import * as dotenv from 'dotenv';

import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello from Mid Journey API!');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    /* This code is making a POST request to the Hugging Face API endpoint for the RunwayML Stable
    Diffusion v1.5 model. The request includes an authorization token in the headers and a JSON
    object in the body with a single property "inputs" that contains the value of the "prompt"
    variable from the request body. The response from the API is then stored in the "response"
    variable. */
    // const response = await fetch(
    //   'https://api-inference.huggingface.co/models/Joeythemonster/anything-midjourney-v-4-1',
    //   {
    //     headers: { Authorization: process.env.HF_TOKEN },
    //     method: 'POST',
    //     body: JSON.stringify({ inputs: prompt }),
    //   }
    // );
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/Joeythemonster/anything-midjourney-v-4-1',
      { inputs: prompt },
      {
        headers: {
          Authorization: process.env.HF_TOKEN,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );
    console.log(response);
    /* This code is converting the image data received from the API response into a base64 encoded
   string that can be used to display the image in a web page. */
    const base64String = Buffer.from(response.data).toString('base64');
    const img = `data:image/jpeg;base64,${base64String}`;

    /* `res.status(200).json({ photo: img });` is sending a response to the client with a status code of
200 (OK) and a JSON object in the body containing a property "photo" with the value of the base64
encoded image string stored in the `img` variable. This response can be used by the client to
display the image on a web page. */
    res.status(200).json({ photo: img });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
