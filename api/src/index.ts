import express from 'express';
import router from './router';
import middleware from './middleware';

const app = express();
const PORT = process.env.API_PORT || 4000;

middleware.initialize(app);
router.initialize(app);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
