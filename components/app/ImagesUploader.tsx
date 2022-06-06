import React, { useContext } from "react";
import ImageUploading from "react-images-uploading";
import AppContext from "../../context/AppContext";
import ImageBlock from "./ImageBlock";

interface ImagesUploaderProps {
  onChange: any;
  className?: string;
}

const ImagesUploader = ({ onChange, className }: ImagesUploaderProps) => {
  const { layers, activeLayerId } = useContext(AppContext);
  const activeLayer = layers.find((layer) => layer.id === activeLayerId);

  return (
    <div className={`images-uploader ${className}`}>
      <ImageUploading
        multiple
        value={activeLayer?.images || []}
        onChange={onChange}
        dataURLKey="data_url"
        acceptType={["gif", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <>
            <div className="image-items row">
              {imageList.map((image, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-3">
                  <ImageBlock
                    image={image}
                    index={index}
                    onImageUpdate={onImageUpdate}
                    onImageRemove={onImageRemove}
                    imageList={imageList}
                    onChange={onChange}
                  />
                </div>
              ))}
            </div>

            <button
              className={`box upload-btn ${
                isDragging ? "dragging" : undefined
              }`}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or drop images here
            </button>
          </>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImagesUploader;
