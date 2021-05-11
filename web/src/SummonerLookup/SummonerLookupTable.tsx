import React, { useEffect, useState } from 'react';
import { Summoner } from './SummonerLookup.model';
import './SummonerLookup.css';

type Props = {
  summonerData: Summoner
}

function SummonerLookupTable(props: Props) {

  return (
    <div className="summoner-lookup-table">
      <h1> {props.summonerData.name} </h1>
      <h3> Summoner Level: {props.summonerData.summonerLevel} </h3>
    </div>
  );
}

export default SummonerLookupTable;
