import { createStyles, makeStyles } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((them) =>
  createStyles({
    style: {
      backgroundColor: '#1f4662',
      color: '#fff',
      fontSize: '12px',
    },

    headerStyle: {
      backgroundColor: '#193549',
      padding: '5px 10px',
      fontFamily: 'monospace',
      color: '#ffc600',
    },

    preStyle: {
      display: 'block',
      padding: '10px 30px',
      margin: '0',
      overflow: 'scroll',
    },
  })
);

const JsonPrettier = (props) => {
  const [showToggle, setShowToggle] = useState(true);
  const classes = useStyles();

  const toggle = () => {
    setShowToggle(!showToggle);
  };

  return (
    <div className={classes.style}>
      <div className={classes.headerStyle} onClick={toggle}>
        <strong>Pretty Json</strong>
      </div>
      {showToggle ? (
        <pre className={classes.preStyle}>{props.data}</pre>
      ) : (
        false
      )}
    </div>
  );
};

export default JsonPrettier;
