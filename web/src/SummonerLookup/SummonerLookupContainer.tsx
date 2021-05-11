import React, { useEffect, useState } from 'react';
import SummonerLookupTable from './SummonerLookupTable'
import { Summoner, testSummoner } from './SummonerLookup.model';
import './SummonerLookup.css';

function SummonerLookupContainer() {
  const [summoner, setSummoner] = useState(testSummoner as Summoner);

  useEffect(() => {
    fetch('http://localhost:4300/summoner/ifeed')
      .then(res => res.json())
      .then(result => {
        setSummoner(result);
      });
  }, []);

  return (
    <div className="summoner-lookup">
      <SummonerLookupTable summonerData={summoner} />
    </div>
  );
}

export default SummonerLookupContainer;
