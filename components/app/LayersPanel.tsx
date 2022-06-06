import React, { useContext, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";
import AppContext from "../../context/AppContext";
import { blendList } from "../../helpers/constants";
import LayerI from "../../types/LayerI";
import Layer from "./Layer";

function LayersPanel() {
  const { layers, setLayers, activeLayerId, setActiveLayerId } =
    useContext(AppContext);

  const [value, setValue] = useState("");

  const addLayer = (value: string) => {
    setLayers([
      ...layers,
      {
        id: Math.random().toString(16).slice(2),
        name: value,
        images: [],
        options: {
          bypassDNA: false,
          blend: blendList[0],
          opacity: 1,
        },
      },
    ]);
  };

  const removeLayer = (e: any, id: string) => {
    e.stopPropagation();
    setActiveLayerId(null);
    setLayers(layers.filter((layer) => layer.id !== id));
  };

  const selectLayer = (id: string) => {
    setActiveLayerId(id);
  };

  const SortableItem = SortableElement(({ name, id }: any) => (
    <Layer
      id={id}
      name={name}
      activeLayerId={activeLayerId}
      selectLayer={selectLayer}
      removeLayer={removeLayer}
    />
  ));

  const SortableList = SortableContainer(({ items }: any) => {
    return (
      <ul className="list-unstyled">
        {items.map(({ id, name }: LayerI, index: any) => (
          <SortableItem key={`item-${id}`} index={index} name={name} id={id} />
        ))}
      </ul>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setLayers(arrayMove(layers, oldIndex, newIndex));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    addLayer(value);
    setValue("");
  };

  const isDisabled = () =>
    !value || layers.map((layer) => layer.name).includes(value);

  return (
    <div className="layers-panel">
      <h6 className="text-center mb-3">Layers</h6>

      <SortableList
        items={layers}
        onSortEnd={onSortEnd}
        lockOffset={["0%", "10%"]}
        distance={1}
      />

      <form noValidate onSubmit={onSubmit} className="app-layer add-layer">
        <input
          type="text"
          placeholder="New Layer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button disabled={isDisabled()}>
          <IoMdAddCircleOutline size={20} />
        </button>
      </form>
    </div>
  );
}

export default LayersPanel;
