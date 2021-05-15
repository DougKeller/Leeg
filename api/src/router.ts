import express from 'express';
import summonerController from './controller/summoner.controller';

const initialize = (app: express.Application) => {
  summonerController.initialize(app);
};

const router = { initialize };
export default router;
