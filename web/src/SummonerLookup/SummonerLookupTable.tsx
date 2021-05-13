import { Summoner } from './SummonerLookup.model';

type Props = {
  summonerData: Summoner
}

function SummonerLookupTable(props: Props) {
  return (
    <div>
      <h1> {props.summonerData.name} </h1>
      <h3> Summoner Level: {props.summonerData.summonerLevel} </h3>
    </div>
  );
}

export default SummonerLookupTable;
