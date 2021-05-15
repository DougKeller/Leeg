import express from 'express';
import { initializeRoutes } from './routes/router';

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  // console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
