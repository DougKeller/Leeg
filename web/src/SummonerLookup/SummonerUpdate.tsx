import { Summoner } from './SummonerLookup.model';
import { useState } from 'react';
import Http from '../common/http';
import Loading from '../Loading/Loading';

type Props = {
  summonerData: Summoner
};

enum State {
  Default, Updated, Updating, Error
}

function SummonerUpdate(props: Props) {
  const [state, setState] = useState(State.Default);

  const updateSummoner = () => {
    setState(State.Updating);

    Http.put(`http://localhost:4300/summoners/${props.summonerData.id}`).then(() => {
      setState(State.Updated);
    }).catch(() => setState(State.Error));
  };

  switch (state) {
    case State.Default:
      return <button onClick={updateSummoner}>Update</button>;
    case State.Updating:
      return <Loading />;
    case State.Updated:
      return <span>Started Update</span>;
    case State.Error:
      return <span>An error has occurred</span>;
  }
}

export default SummonerUpdate;
