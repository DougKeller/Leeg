export type Summoner = {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
}

export const mockSummoner: Summoner = {
  accountId: 'mock-account-id',
  id: 'mock-id',
  name: 'test-summoner',
  profileIconId: 69,
  puuid: 'test-puuid',
  revisionDate: 420,
  summonerLevel: 420
}
