import express from 'express';
import cors from 'cors';
import summonerService from './common/riot/summoner';

import { Kayn } from 'kayn';

const initialize = (app: express.Application) => {
  app.get('/summoners/find', async (request, response) => {
    const summonerName = request.query.name;

    try {
      const summoner = await Kayn('')({ apiURLPrefix: 'http://kernel:8080' }).Summoner.by.name('ifeed');
      console.log(summoner);

    } catch (e) {
      console.log('Error', e);
    }
    // if (typeof summonerName !== 'string') {
    //   response.status(422).json({ error: 'no name provided' });
    //   return;
    // }

    // try {
    //   const summoner = await summonerService.getByName(summonerName);
    //   console.log(summoner);
    //   response.json(summoner);
    // } catch (e) {
    //   console.error(e);
    //   response.status(404).send()
    // }

    response.send();
  });
};

const router = { initialize };
export default router;
