import React, { useEffect, useState } from 'react';
import SummonerLookupTable from './SummonerLookupTable'
import Loading from '../Loading/Loading';
import { Summoner } from './SummonerLookup.model';
import Http from '../common/http';

type State = {
  error?: boolean
  summoner?: Summoner
};

function SummonerLookupContainer() {
  const summonerName = 'iFeed';
  const [state, setState] = useState<State>({});

  useEffect(() => {
    const url = 'http://localhost:4300/summoners/find?name=' + encodeURIComponent(summonerName);
    Http.get<Summoner>(url).then(summoner => {
      setState({ summoner });
    }).catch((error) => {
      setState({ error: true });
    });
  }, []);

  if (state.summoner) {
    return <SummonerLookupTable summonerData={state.summoner} />;
  }

  if (state.error) {
    return <h3>Summoner not found: {summonerName}</h3>;
  }

  return <Loading />;
}

export default SummonerLookupContainer;
