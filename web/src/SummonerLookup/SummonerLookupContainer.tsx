import React, { useState, ChangeEvent, FormEvent } from 'react';
import SummonerLookupTable from './SummonerLookupTable'
import Loading from '../Loading/Loading';
import { Summoner, mockSummoner } from './SummonerLookup.model';
import Http from '../common/http';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './SummonerLookup.css';

type State = {
  summonerName?: string
  loading?: boolean
  error?: boolean
  summoner?: Summoner
};

const StyledTextField = withStyles({
  root: {
    background: 'white',
    margin: '0 0 10px 0',
    "& .Mui-focused": {
      color: "#9ab8ce",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#9ab8ce"
      }
    }
  }
})(TextField);

const StyledButton = withStyles({
  root: {
    background: '#9ab8ce',
    margin: '0 0 10px 0',
    color: 'black'
  }
})(Button);

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

    //setState({ loading: false, summoner: mockSummoner });
  };

  const findBox = (
    <form onSubmit={findSummoner} className='search-container'>
      <StyledTextField id="outlined-basic" label="Summoner Name" variant="outlined" type="text" onChange={enteredText} required/>
      <StyledButton type="submit">Find</StyledButton>
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
