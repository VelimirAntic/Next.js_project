import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import RangeBox from "./RangeBox";

interface ImageBlockProps {
  image: any;
  index: number;
  onImageRemove: any;
  onImageUpdate: any;
  onChange: any;
  imageList: any;
}

const ImageBlock = ({
  image,
  index,
  onImageRemove,
  onImageUpdate,
  onChange,
  imageList,
}: ImageBlockProps) => {
  return (
    <div className="image-item box">
      <img src={image["data_url"]} alt="" className="img-fluid" />
      <div className="btn-wrapper">
        <button className="remove" onClick={() => onImageRemove(index)}>
          <IoMdClose />
        </button>
        <button className="update" onClick={() => onImageUpdate(index)}>
          <BiPencil />
        </button>
      </div>

      <span className="rarity-value box">{image.rarity}%</span>

      <RangeBox
        min={0.2}
        max={100}
        value={image.rarity ? image.rarity : 1}
        onChange={(e: any) =>
          onChange(imageList, index, parseFloat(e.target.value))
        }
      />

      <div className="d-flex justify-content-between rare-common">
        <span>Rare</span>
        <span>Common</span>
      </div>
    </div>
  );
};

export default ImageBlock;
