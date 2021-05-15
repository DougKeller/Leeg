import client from './client';

export const getByName = (name: string) => {
  return client.Summoner.by.name(name);
};

const summonerService = { getByName };
export default summonerService;
