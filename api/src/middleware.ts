import express from 'express';
import cors from 'cors';

const initialize = (app: express.Application) => {
  app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
};

const middleware = { initialize };
export default middleware;
