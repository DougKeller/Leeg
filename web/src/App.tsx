import React, { useEffect, useState } from 'react';
import './App.css';

type Summoner = {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
}

function App() {
  const [summoner, setSummoner] = useState({} as Summoner);

  useEffect(() => {
    fetch('http://localhost:4300/summoner/ifeed')
      .then(res => res.json())
      .then(result => {
        setSummoner(result);
      });
  }, []);

  return (
    <div className="App">
      <h1>{summoner.name}</h1>
      <h3>Level {summoner.summonerLevel}</h3>
    </div>
  );
}

export default App;
