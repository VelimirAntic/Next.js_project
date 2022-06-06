import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import {
  collectionDescSchema,
  collectionNameSchema,
  collectionSizeSchema,
  heightSchema,
  schema,
  widthSchema,
} from "../../helpers/schemas";
import { showToast } from "../../helpers/utils";
import CheckBox from "./CheckBox";
import FormControl from "./FormControl";

const ProjectPanel = () => {
  const {
    collectionName,
    setCollectionName,
    collectionDesc,
    setCollectionDesc,
    collectionSize,
    setCollectionSize,
    width,
    setWidth,
    height,
    setHeight,
    useGif,
    setUseGif,
    layers,
  } = useContext(AppContext);

  const setName = async (name: any) => {
    try {
      await collectionNameSchema.validate({
        collectionName: name,
      });

      setCollectionName(name);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const setDesc = async (desc: string) => {
    try {
      await collectionDescSchema.validate({
        collectionDesc: desc,
      });

      setCollectionDesc(desc);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const setSize = async (size: number) => {
    try {
      // await collectionSizeSchema.validate({
      //   collectionSize: size,
      // });

      setCollectionSize(size);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const setWidthV = async (width: number) => {
    try {
      // await widthSchema.validate({
      //   width: width,
      // });

      setWidth(width);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const setHeightV = async (height: number) => {
    try {
      // await heightSchema.validate({
      //   height: height,
      // });

      setHeight(height);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  return (
    <div className="project-panel">
      <h6 className="text-center mb-3">Project Settings</h6>

      <div>
        <div className="mb-2">
          <CheckBox
            label="Generate GIF"
            checked={useGif}
            onCheck={(e: any) => setUseGif(e.target.checked)}
          />
        </div>

        <div className="mb-2">
          <FormControl
            label="Project Name"
            type="text"
            value={collectionName}
            onChange={setName}
          />
        </div>

        <div className="mb-2">
          <FormControl
            label="Project Description"
            type="text"
            value={collectionDesc}
            onChange={setDesc}
          />
        </div>

        <div className="mb-2">
          <FormControl
            label="Collection Size"
            type="number"
            value={collectionSize.toString()}
            onChange={setSize}
          />
        </div>

        <div className="mb-2">
          <FormControl
            label="Item Width"
            type="number"
            value={width.toString()}
            onChange={setWidthV}
          />
        </div>

        <div className="">
          <FormControl
            label="Item Height"
            type="number"
            value={height.toString()}
            onChange={setHeightV}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;
