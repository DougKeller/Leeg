import React, { useState, ChangeEvent, FormEvent } from 'react';
import SummonerLookupTable from './SummonerLookupTable'
import Loading from '../Loading/Loading';
import { Summoner } from './SummonerLookup.model';
import Http from '../common/http';

type State = {
  summonerName?: string
  loading?: boolean
  error?: boolean
  summoner?: Summoner
};

function SummonerLookupContainer() {
  const [state, setState] = useState<State>({});

  const enteredText = (event: ChangeEvent<HTMLInputElement>) => {
    state.summonerName = event.target.value;
    setState(state);
  };

  const findSummoner = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const summonerName = state.summonerName;
    if (!summonerName) {
      return;
    }

    setState({ loading: true, summonerName });
    const url = 'http://localhost:4300/summoners/find?name=' + encodeURIComponent(summonerName);
    Http.get<Summoner>(url).then(summoner => {
      setState({ summoner });
    }).catch((error) => {
      setState({ error: true, summonerName });
    });
  };

  const findBox = (
    <form onSubmit={findSummoner}>
      <input autoFocus type="text" onChange={enteredText} required />
      <button type="submit">Find</button>
    </form>
  );

  if (state.loading) {
    return <Loading />;
  }

  if (state.summoner) {
    return (
      <div>
        { findBox }
        <SummonerLookupTable summonerData={state.summoner} />
      </div>
    );
  }

  if (state.error) {
    return (
      <div>
        { findBox }
        <h3>Summoner not found</h3>
      </div>
    );
  }

  return findBox;
}

export default SummonerLookupContainer;
