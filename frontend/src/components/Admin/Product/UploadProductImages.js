import React, { useState, useEffect } from "react";

const UploadProductImages = ({ setimagesFile, imagesFile }) => {
  // console.log(imagesFile);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => {
      file.preview = URL.createObjectURL(file);
      return file;
    });

    if (selectedFiles.length > 0) {
      setimagesFile(selectedFiles);
    } else {
      console.log("No files selected");
    }
  };

  useEffect(() => {
    // Cleanup object URLs when component unmounts or files change
    return () => {
      imagesFile.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [imagesFile]);

  return (
    <>
      <div className="d-flex flex-row gap-5 mt-2">
        <div>
          <label htmlFor="myfile">Choose 5 Images</label>
        </div>

        <div title="You can select multiple images">
          <input
            type="file"
            name="myfile"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </div>
      </div>

      {imagesFile.length > 0 ? (
        <h6 className="py-3 text-center">Your Selected Files</h6>
      ) : null}

      <div className="mt-3  d-flex flex-row gap-3 flex-wrap">
        {imagesFile.map((file, index) => (
          <div key={index}>
            <img
              src={file.preview}
              alt={` ${index + 1} - ${file.name}`}
              title={`Image ${index + 1} - ${file.name} `}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadProductImages;
