import express from 'express';
import summonerService from '../service/summoner.service';

const initialize = (app: express.Application) => {
  app.get('/summoners/find', (request, response) => {
    const summonerName = request.query.name;

    if (typeof summonerName !== 'string') {
      response.status(422).json({ error: 'no name provided' });
      return;
    }

    summonerService.getByName(summonerName).then(
      summoner => response.json(summoner),
      error => response.sendStatus(error.statusCode)
    );
  });

  app.put('/summoners/:id', (request, response) => {
    const summonerId = request.params.id;

    if (typeof summonerId !== 'string') {
      response.status(422).json({ error: 'no id provided' });
      return;
    }

    summonerService.getById(summonerId).then(
      summoner => response.sendStatus(202),
      error => response.sendStatus(error.statusCode)
    );
  });
};

const summonerController = { initialize };
export default summonerController;
