import { useState, useRef, useEffect } from 'react';
import { convertIncheToPixel, convertPixelToInche } from './utility';
import './App.css';
import { CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import JsonPrettier from './components/JsonPrettier';

const useStyles = makeStyles((them) =>
  createStyles({
    canvas: {
      height: 600,
      with: 500,
      background: 'red',
    },
  })
);

function App() {
  const [image, setImage] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(false);
  const [imagePostion, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const dpi = window.devicePixelRatio;
    setCanvasSize({
      width: convertIncheToPixel(15),
      height: convertIncheToPixel(10),
    });
  }, []);

  // const [pin, setPin] = useState("");
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const classes = useStyles();

  const handleChange = (e) => {
    var files = e.target.files;
    var file = files[0];
    // for (var i = 0; i < files.length; ++i) {
    //   file = files[i];
    //   // check if file is valid Image (just a MIME check)
    //   switch (file.type) {
    //     case 'image/jpeg':
    //     case 'image/png':
    //     case 'image/gif':
    //       // read Image contents from file
    //       var reader = new FileReader();
    //       reader.onload = function (e) {
    //         // create HTMLImageElement holding image data
    //         var img = new Image();
    //         img.src = reader.result;

    //         setImage(null);
    //         setImage(img);
    //         // remove existing images from ImageContainer
    //         // while ( imageContainer.childNodes.length > 0 )
    //         //     imageContainer.removeChild( imageContainer.childNodes[ 0 ]);

    //         // add image to container
    //         //imageContainer.appendChild( img );

    //         img.onload = function () {
    //           // grab some data from the image
    //           var imageData = {
    //             width: img.naturalWidth,
    //             height: img.naturalHeight,
    //           };
    //           console.log(
    //             'Loaded Image w/dimensions ' +
    //               imageData.width +
    //               ' x ' +
    //               imageData.height
    //           );
    //         };
    //         // do your magic here...
    //       };
    //       reader.readAsDataURL(file);
    //       // process just one file.
    //       return;

    //     default:
    //       console.log('not a valid Image file :' + file.name);
    //   }
    // }

    setImage(URL.createObjectURL(file)); //

    // setImage(`${window.location.origin}/${event.target.files[0].name}`);
    // const image = preprocessImage(canvasObj, event.target.files[0]);
  };

  const extractText = () => {
    const photoWidthInche = convertPixelToInche(imageScale.width);
    const photoHeightInche = convertPixelToInche(imageScale.height);

    const obj = {
      canvas: {
        width: 15,
        height: 10,
        photo: {
          name: 'file1',
          width: photoWidthInche,
          height: photoHeightInche,
          postion: {
            x: imagePostion.x,
            y: imagePostion.y,
          },
        },
      },
    };

    setExtractedData(JSON.stringify(obj, null, 2));
    clearCanvas();
  };

  const buildImageFromJsonData = () => {
    const data = JSON.parse(extractedData);
    // load image

    if (data.canvas && data.canvas.photo && data.canvas.photo.postion) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const photo = data.canvas.photo;
      setImageScale({
        width: convertIncheToPixel(photo.width),
        height: convertIncheToPixel(photo.height),
      });

      setImagePosition(photo.postion);

      ctx.drawImage(
        imageRef.current,
        photo.postion.x,
        photo.postion.y,
        convertIncheToPixel(photo.width),
        convertIncheToPixel(photo.height)
      );
    } else {
      alert('data is not vaild');
      console.error('data is not vaild');
    }
  };

  const zoomOut = () => {
    var ctx = clearCanvas();
    let scale = imageScale;
    scale.height = scale.height * 0.5;
    scale.width = scale.width * 0.5;
    setImageScale(scale);
    ctx.drawImage(
      imageRef.current,
      imagePostion.x,
      imagePostion.y,
      imageScale.width,
      imageScale.height
    ); // draw image at current position
  };

  const zoomIn = () => {
    var ctx = clearCanvas();
    let scale = imageScale;
    scale.height = scale.height * 2;
    scale.width = scale.width * 2;
    setImageScale(scale);
    ctx.drawImage(
      imageRef.current,
      imagePostion.x,
      imagePostion.y,
      imageScale.width,
      imageScale.height
    ); // draw image at current position
  };

  const moveRight = () => {
    var ctx = clearCanvas();
    const postion = imagePostion;
    postion.x = postion.x + 100;
    setImagePosition(postion);
    ctx.drawImage(
      imageRef.current,
      imagePostion.x,
      imagePostion.y,
      imageScale.width,
      imageScale.height
    ); // draw image at current position
  };

  const moveLeft = () => {
    var ctx = clearCanvas();
    const postion = imagePostion;
    postion.x = postion.x - 100;
    setImagePosition(postion);
    ctx.drawImage(
      imageRef.current,
      imagePostion.x,
      imagePostion.y,
      imageScale.width,
      imageScale.height
    ); // draw image at current position
  };

  const handleClick = () => {
    debugger;
    //setLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // ctx.width = 10;
    // ctx.height = 20;
    // ctx.fillRect(100, 100, 60, 60);
    // canvas.width = imageRef.current.width;
    // canvas.height = imageRef.current.height;

    setImageScale({
      width: imageRef.current.width,
      height: imageRef.current.height,
    });
    ctx.drawImage(imageRef.current, 0, 0);

    // var rect = canvas.getBoundingClientRect();
    // var re = canvas.VerticalResolution;
    // //ctx.putImageData(preprocessImage(canvas), 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');

    // Tesseract.recognize(dataUrl, 'eng', {
    //   logger: (m) => console.log(m),
    // })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .then((result) => {
    //     setLoading(false);
    //     // Get Confidence score
    //     let confidence = result.confidence;
    //     // Get full output
    //     let text = result.text;

    //     setText(text);
    //     // setPin(patterns);
    //   });
  };

  return (
    <div className="App">
      <main className="App-main">
        <h3>Actual image uploaded</h3>
        <img
          // style={{ height: 200 }}
          src={image}
          className="App-logo"
          alt="logo"
          ref={imageRef}
        />
        <h3>Canvas</h3>
        <canvas
          className={classes.canvas}
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        ></canvas>
        <h3>Extracted text</h3>
        <JsonPrettier data={extractedData} />
        <input type="file" onChange={handleChange} />
        <button onClick={handleClick} style={{ height: 50 }}>
          {loading && <CircularProgress />} convert to textConvert to text
        </button>
        <button onClick={moveRight} style={{ height: 50 }}>
          {loading} move right
        </button>
        <button onClick={moveLeft} style={{ height: 50 }}>
          {loading} move left
        </button>
        <button onClick={zoomIn} style={{ height: 50 }}>
          {loading} Zoom In
        </button>
        <button onClick={zoomOut} style={{ height: 50 }}>
          {loading} Zoom Out
        </button>
        <button onClick={extractText} style={{ height: 50 }}>
          {loading} Extract Text
        </button>
        <button onClick={buildImageFromJsonData} style={{ height: 50 }}>
          {loading} Extract Text
        </button>
      </main>
    </div>
  );

  function clearCanvas() {
    const canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    return ctx;
  }
}

export default App;
