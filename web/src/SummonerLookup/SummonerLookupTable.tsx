import { Summoner } from './SummonerLookup.model';
import SummonerUpdate from './SummonerUpdate';
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type Props = {
  summonerData: Summoner
}

const useStyles = makeStyles({
table: {
  minWidth: 650,
  },
});

function SummonerLookupTable(props: Props) {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stat</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props.summonerData).map(key => (
            <TableRow key={key}>
              <TableCell component="th" scope="key">
                {key}
              </TableCell>
              <TableCell align="right">
                {props.summonerData[key as keyof Summoner]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SummonerLookupTable;
