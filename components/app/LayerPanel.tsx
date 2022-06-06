import React, { useContext } from "react";
import { BsLayers } from "react-icons/bs";
import AppContext from "../../context/AppContext";
import { blendList } from "../../helpers/constants";
import ImagesUploader from "./ImagesUploader";
import FormControl from "./FormControl";
import CheckBox from "./CheckBox";
import SelectBox from "./SelectBox";
import RangeBox from "./RangeBox";
import { dataURItoBlob } from "../../services/generate";
import { layersNamesSchema, layersSchema, schema } from "../../helpers/schemas";
import { showToast } from "../../helpers/utils";

function LayerPanel() {
  const {
    activeLayerId,
    collectionName,
    collectionDesc,
    collectionSize,
    width,
    height,
    layers,
    setLayers,
  } = useContext(AppContext);

  const activeLayer = layers.find((layer) => layer.id === activeLayerId);

  const changeName = async (value: string) => {
    try {
      const newLayers = [...layers];
      const index = newLayers.findIndex((layer) => layer.id === activeLayerId);
      newLayers[index].name = value;

      await layersNamesSchema.validate({
        layers: newLayers,
      });

      setLayers([...newLayers]);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const changeImages = async (
    imageList: any,
    addUpdateIndex: any,
    rarity: number
  ) => {
    const list: any = [];

    imageList.forEach((e: any, index: number) => {
      const item: any = {};

      if (rarity) {
        if (addUpdateIndex === index)
          item.rarity = parseFloat(rarity.toFixed(1)) ? rarity : 0;
        else {
          const r = imageList[addUpdateIndex].rarity;
          item.rarity = parseFloat(
            ((100 - r) / (imageList.length - 1)).toFixed(1)
          );
        }
      } else {
        // default rarity
        item.rarity = parseFloat((100 / imageList.length).toFixed(1));
      }

      // const blob = dataURItoBlob(e.data_url);
      item.data_url = e.data_url;
      // item.blob = URL.createObjectURL(blob);

      list.push(item);
    });

    const newLayers = [...layers];
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId);

    newLayers[index].images = list;

    setLayers([...newLayers]);
  };

  const toggleDNA = (e: any) => {
    const newLayers = [...layers];
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId);
    newLayers[index].options.bypassDNA = e.target.checked;
    setLayers([...newLayers]);
  };

  const chooseBlend = (e: any) => {
    const newLayers = [...layers];
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId);
    newLayers[index].options.blend = e.target.value;
    setLayers([...newLayers]);
  };

  const changeOpacity = (e: any) => {
    const newLayers = [...layers];
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId);
    newLayers[index].options.opacity = parseFloat(e.target.value);
    setLayers([...newLayers]);
  };

  if (!activeLayerId || layers.length === 0)
    return (
      <div className="text-center">
        <BsLayers size={50} color="rgba(27, 22, 66, 0.6)" />
        <h5 className="mt-3">No layer selected</h5>
      </div>
    );

  return (
    <div>
      {/* Name */}
      <FormControl
        label="Layer name"
        type="text"
        value={activeLayer?.name || ""}
        onChange={changeName}
        className="mb-4"
      />

      {/* Images */}
      <label className="form-title mb-2">Images</label>
      <ImagesUploader onChange={changeImages} className="mb-4" />

      <div className="row">
        <div className="col-md-4">
          {/* blend */}
          <SelectBox
            label="Blend"
            value={activeLayer?.options.blend}
            onChange={chooseBlend}
          >
            {blendList.map((blend: any, index: number) => (
              <option key={`blend-${index}`} value={blend}>
                {blend}
              </option>
            ))}
          </SelectBox>
        </div>

        <div className="col-md-4">
          {/* opacity */}
          <RangeBox
            label="Opacity"
            value={activeLayer?.options.opacity}
            onChange={changeOpacity}
          />
        </div>

        <div className="col-md-4">
          {/* bypassDNA */}
          <CheckBox
            checked={activeLayer?.options.bypassDNA}
            onCheck={toggleDNA}
            label="By Pass DNA"
          />
        </div>
      </div>
    </div>
  );
}

export default LayerPanel;
