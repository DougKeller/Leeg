import { Summoner } from './SummonerLookup.model';
import SummonerUpdate from './SummonerUpdate';

type Props = {
  summonerData: Summoner
}

function SummonerLookupTable(props: Props) {
  return (
    <div>
      <h1> {props.summonerData.name} </h1>
      <h3> Summoner Level: {props.summonerData.summonerLevel} </h3>
      <SummonerUpdate summonerData={props.summonerData} />
    </div>
  );
}

export default SummonerLookupTable;
