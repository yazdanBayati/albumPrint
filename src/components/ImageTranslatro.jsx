import { useRef, useState } from 'react';

import Tesseract from 'tesseract.js';
import { CircularProgress } from '@material-ui/core';

const ImageTranslatro = () => {
  const fileRef = useRef();
  const [text, setText] = useState('');
  const [imagePath, setImagePaht] = useState('');
  const [loading, setLoading] = useState(false);
  fileRef.current = null;

  const handleChange = (e) => {
    setImagePaht(URL.createObjectURL(e.target.files[0]));
  };

  const handleClick = () => {
    setLoading(true);
    Tesseract.recognize(imagePath, 'eng', {
      logger: (m) => console.log(m),
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        // Get Confidence score
        setLoading(false);
        let confidence = result.confidence;

        let text = result.text;
        setText(text);
      });
  };

  const canvasRef = useRef();
  canvasRef.current = null;
  return (
    <main className="App-main">
      <h3>Actual image uploaded</h3>
      <img
        style={{ height: 300 }}
        src={imagePath}
        className="App-logo"
        alt="logo"
      />

      <h3>Extracted text</h3>
      <div className="text-box">
        <p> {text} </p>
      </div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick} style={{ height: 50 }}>
        {loading && <CircularProgress />} convert to text
      </button>
    </main>
  );
};

export default ImageTranslatro;
