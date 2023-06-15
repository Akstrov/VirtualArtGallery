import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import stableDiffusionRoutes from './routes/stableDiffusionRoutes.js';
import midjourneyRoutes from './routes/midJourneyRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('dist'));

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/stable-diffusion', stableDiffusionRoutes);
app.use('/api/v1/midjourney', midjourneyRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Stable Diffusion API!');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(8080, () => {
      console.log('Server is running');
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
