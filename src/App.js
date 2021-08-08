import './App.css';
import Print from './components/Print';
import { AppBar, Toolbar, Grid, Typography } from '@material-ui/core';

function App() {
  return (
    <div>
      <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
          <Grid container justify="center" wrap="wrap">
            <Grid item>
              <Typography variant="h6">Album Printer</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Print />
    </div>
  );
}

export default App;
