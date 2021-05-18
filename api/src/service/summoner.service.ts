import client from '@leeg/common/riot/client';
import database from '@leeg/database';

const getCollection = () => database.instance().collection('summoners');

export type Summoner = {
  _id: string;
  apiData: {
    accountId: string | undefined;
    id: string;
    name: string;
    profileIconId: number;
    puuid: string;
    revisionDate: number;
    summonerLevel: number;
  }
}

const getByName = async (name: string) => {
  let summoner = await getCollection().findOne({ apiData: { name } }) as Summoner;

  if (!summoner) {
    const apiSummoner = await client.Summoner.by.name(name);
    if (!apiSummoner) {
      throw new Error('Summoner not found');
    }

    const existing = await getCollection().findOne({ apiData: { id: apiSummoner.id } }) as Summoner;
    if (existing) {
      existing.apiData = apiSummoner as Required<typeof apiSummoner>;
      await getCollection().updateOne({ _id: existing._id }, existing);
    } else {
      await getCollection().insert({ apiData: apiSummoner });
    }
  }

  return summoner;
};

const getById = async (id: string) => {
  return await getCollection().findOne({ id: { $eq: id } }) as Summoner;
};

const summonerService = { getByName, getById };
export default summonerService;
