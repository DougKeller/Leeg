export type Summoner = {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
}

export const testSummoner: Summoner = {
  accountId: '123',
  id: '456',
  name: 'IFeed',
  profileIconId: 45,
  puuid: 'puuid',
  revisionDate: 360,
  summonerLevel: 208
}
