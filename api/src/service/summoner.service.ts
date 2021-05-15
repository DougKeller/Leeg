import client from '../common/riot/client';

const getByName = (name: string) => client.Summoner.by.name(name);
const getById = (id: string) => client.Summoner.by.id(id);

const summonerService = { getByName, getById };
export default summonerService;
