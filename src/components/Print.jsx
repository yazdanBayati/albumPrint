import { useState, useRef, useEffect } from 'react';
import { convertIncheToPixel, convertPixelToInche } from '../utility';
import { Paper, Grid, Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import JsonPrettier from './JsonPrettier';
import FileUploader from './FileUploader';
import { MoveType } from '../enums/MoveType';
import { ScaleType } from '../enums/ScalType';
import CanvasCotrolPanel from './CanvasControlPanel';

const useStyles = makeStyles((them) =>
  createStyles({
    paper: {
      padding: 5,
    },
    hideCanvas: {
      display: 'none',
    },
    canvas: {
      //background: 'red',
    },
  })
);

const Print = () => {
  const [selectedFile, setSelectdFile] = useState({ url: '', name: '' });
  const [extractedData, setExtractedData] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [imagePostion, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState({ width: 0, height: 0 });
  const [showCanvas, setShowCanvas] = useState(false);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    setCanvasSize({
      width: convertIncheToPixel(15),
      height: convertIncheToPixel(10),
    });
  }, []);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const classes = useStyles();

  const extractJson = () => {
    const photoWidthInche = convertPixelToInche(imageScale.width);
    const photoHeightInche = convertPixelToInche(imageScale.height);
    const xInche = convertPixelToInche(imagePostion.x);
    const yInche = convertPixelToInche(imagePostion.y);

    const obj = {
      canvas: {
        width: 15,
        height: 10,
        photo: {
          name: selectedFile.name,
          url: selectedFile.url,
          width: photoWidthInche,
          height: photoHeightInche,
          postion: {
            x: xInche,
            y: yInche,
          },
        },
      },
    };

    setExtractedData(JSON.stringify(obj, null, 2));
    clearCanvas();
    setShowCanvas(false);
    setShowJson(true);
  };

  const buildImageFromJsonData = () => {
    const data = JSON.parse(extractedData);

    if (data.canvas && data.canvas.photo && data.canvas.photo.postion) {
      setShowCanvas(true);
      setShowJson(false);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const photo = data.canvas.photo;
      const pixelWidth = convertIncheToPixel(photo.width);
      const pixelHeight = convertIncheToPixel(photo.height);
      const pixelX = convertIncheToPixel(photo.postion.x);
      const pixelY = convertIncheToPixel(photo.postion.y);
      setImageScale({
        width: pixelWidth,
        height: pixelHeight,
      });

      setImagePosition({
        x: pixelX,
        y: pixelY,
      });

      ctx.drawImage(imageRef.current, pixelX, pixelY, pixelWidth, pixelHeight);
    } else {
      const message = 'data is not vaild';
      alert(message);
      console.error(message);
    }
  };

  const handleFileUpload = (file) => {
    setSelectdFile(file);
    setShowCanvas(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setImageScale({
      width: imageRef.current.width,
      height: imageRef.current.height,
    });
    ctx.drawImage(imageRef.current, 0, 0);
  };

  const hanleFileDelete = () => {
    setSelectdFile({ url: '', name: '' });
    setExtractedData(null);
    setImagePosition({ x: 0, y: 0 });
    setImageScale({ width: 0, height: 0 });
    setShowJson(false);
    setShowCanvas(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    return ctx;
  };

  const handleScale = (val) => {
    var ctx = clearCanvas();
    let scale = imageScale;
    if (val === ScaleType.ScaleIn) {
      scale.height = scale.height * 2;
      scale.width = scale.width * 2;
    } else {
      scale.height = scale.height * 0.5;
      scale.width = scale.width * 0.5;
    }
    setImageScale(scale);
    ctx.drawImage(
      imageRef.current,
      imagePostion.x,
      imagePostion.y,
      imageScale.width,
      imageScale.height
    );
  };

  const handleMove = (val) => {
    const postion = imagePostion;
    fillPostionPerType(val, postion);
    var ctx = clearCanvas();
    setImagePosition(postion);
    ctx.drawImage(
      imageRef.current,
      imagePostion.x,
      imagePostion.y,
      imageScale.width,
      imageScale.height
    );
  };

  const fillPostionPerType = (val, postion) => {
    switch (val) {
      case MoveType.Left:
        postion.x = postion.x - 100;
        break;
      case MoveType.Right:
        postion.x = postion.x + 100;
        break;
      case MoveType.Up:
        postion.y = postion.y - 100;
        break;
      case MoveType.Down:
        postion.y = postion.y + 100;
        break;
      default:
        console.error('Move Type is not valid');
    }
  };

  return (
    <Paper style={{ padding: 50 }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid>
          <FileUploader
            minWidthInche={15}
            minHeightInche={10}
            onUpload={handleFileUpload}
            onDelete={hanleFileDelete}
          />
        </Grid>

        <Grid style={{ marginLeft: 12 }}>
          {showJson && (
            <Button
              onClick={buildImageFromJsonData}
              className="btn-choose"
              variant="outlined"
              component="span"
            >
              Generate Photo
            </Button>
          )}
          {showCanvas && (
            <Button
              onClick={extractJson}
              className="btn-choose"
              variant="outlined"
              component="span"
            >
              Extract Json
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid style={{ marginTop: 51 }}>
        <img
          style={{ display: 'none' }}
          src={selectedFile.url}
          className="App-logo"
          alt="logo"
          ref={imageRef}
        />
        {showCanvas && (
          <CanvasCotrolPanel onMove={handleMove} onScale={handleScale} />
        )}
        <canvas
          className={!showCanvas ? classes.hideCanvas : classes.canvas}
          id="cavas"
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        ></canvas>
        {showJson && <JsonPrettier data={extractedData} />}
      </Grid>
    </Paper>
  );
};

export default Print;
