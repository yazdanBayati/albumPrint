import { Button } from '@material-ui/core';
import { useRef, useState } from 'react';
import { convertPixelToInche } from '../utility';
import swal from 'sweetalert';

const FileUploader = (props) => {
  const fileRef = useRef(null);
  const [fileExist, setFileExist] = useState(false);

  const handleFileChange = (e) => {
    if (!fileExist) {
      const files = e.target.files;
      if (files && files.length === 1) {
        // only 1 file allowed
        let file = files[0];
        let img = new Image();
        let objectUrl = URL.createObjectURL(file);
        img.onload = function () {
          const widthInche = convertPixelToInche(this.naturalWidth);
          const hieghtInche = convertPixelToInche(this.naturalHeight);

          if (
            widthInche < props.minWidthInche ||
            hieghtInche < props.minHeightInche
          ) {
            swal('oops...', 'file is not valid', 'error');
            fileRef.current = null;
          } else {
            //URL.revokeObjectURL(objectUrl);

            const obj = {
              url: objectUrl,
              name: file.name,
            };
            props.onUpload(obj);
            setFileExist(true);
            e.target.value = null;
          }
        };
        img.src = objectUrl;
      }
    } else {
      swal(
        'File Exist',
        'first delete current file then upload new one',
        'error'
      );
    }
  };

  const handleDelete = (e) => {
    //fileRef.current = null;
    swal({
      title: 'Are you sure?',
      text: 'by deleting file you will lost all the data',
      icon: 'error',
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setFileExist(false);
        props.onDelete();
        e.target.value = null;
      }
    });
  };

  return (
    <div className="mg20">
      <input
        id="btn-upload"
        name="btn-upload"
        style={{ display: 'none' }}
        type="file"
        onChange={handleFileChange}
        ref={fileRef}
      />
      {!fileExist ? (
        <Button
          onClick={(e) => fileRef.current && fileRef.current.click()}
          className="btn-choose"
          variant="outlined"
          component="span"
        >
          Choose File
        </Button>
      ) : (
        <Button
          style={{ marginLeft: 12 }}
          onClick={handleDelete}
          className="btn-choose"
          variant="outlined"
          component="span"
        >
          Delete File
        </Button>
      )}
    </div>
  );
};

export default FileUploader;
