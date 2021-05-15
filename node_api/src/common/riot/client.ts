import { Kayn } from 'kayn';

const RIOT_API_KEY = 'unneeded';

const client = Kayn(RIOT_API_KEY)({
  apiURLPrefix: 'http://kernel:8080'
});
export default client;
