import { Button, Grid } from '@material-ui/core';
import { MoveType } from '../enums/MoveType';
import { ScaleType } from '../enums/ScalType';

const CanvasCotrolPanel = (props) => {
  return (
    <Grid style={{ marginBottom: 11 }} container justifyContent="center">
      <Grid>
        <Button
          onClick={(e) => props.onMove(MoveType.Up)}
          variant="contained"
          color="primary"
        >
          Move UP
        </Button>
        <Button
          style={{ marginLeft: 11 }}
          onClick={(e) => props.onMove(MoveType.Down)}
          variant="contained"
          color="primary"
        >
          Move Down
        </Button>
        <Button
          style={{ marginLeft: 11 }}
          onClick={(e) => props.onMove(MoveType.Right)}
          variant="contained"
          color="primary"
        >
          Move Right
        </Button>
        <Button
          style={{ marginLeft: 11 }}
          onClick={(e) => props.onMove(MoveType.Left)}
          variant="contained"
          color="primary"
        >
          Move Left
        </Button>
        <Button
          style={{ marginLeft: 11 }}
          onClick={(e) => props.onScale(ScaleType.ScaleIn)}
          variant="contained"
          color="primary"
        >
          Scale In
        </Button>
        <Button
          style={{ marginLeft: 11 }}
          onClick={(e) => props.onScale(ScaleType.ScaleOut)}
          variant="contained"
          color="primary"
        >
          Scale Out
        </Button>
      </Grid>
    </Grid>
  );
};

export default CanvasCotrolPanel;
