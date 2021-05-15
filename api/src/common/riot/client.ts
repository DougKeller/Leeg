import { Kayn, REGIONS, RedisCache, KaynError } from 'kayn';

const client = Kayn(process.env.RIOT_API_KEY)({
  region: REGIONS.NORTH_AMERICA,
  cacheOptions: {
    cache: new RedisCache({
      host: 'redis',
      port: 6379
    }),
    timeToLives: {
      useDefault: true
    }
  }
});
export default client;
