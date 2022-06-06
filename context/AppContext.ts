import React from "react";
import DataI from "../types/DataI";
import LayerI from "../types/LayerI";

interface AppContextInterface {
  layers: LayerI[];
  setLayers: any;
  activeLayerId: string | null;
  setActiveLayerId: any;
  collectionName: string;
  setCollectionName: any;
  collectionDesc: string;
  setCollectionDesc: any;
  collectionSize: number;
  setCollectionSize: any;
  useGif: boolean;
  setUseGif: any;
  width: number;
  setWidth: any;
  height: number;
  setHeight: any;
  loading: boolean;
  data: DataI | undefined;
  showResults: boolean;
  setShowResults: any;
}

const AppContext = React.createContext<AppContextInterface>({
  layers: [],
  setLayers: null,
  activeLayerId: null,
  setActiveLayerId: null,
  collectionName: "",
  setCollectionName: null,
  collectionDesc: "",
  setCollectionDesc: null,
  collectionSize: 5,
  setCollectionSize: null,
  width: 512,
  setWidth: null,
  height: 512,
  setHeight: null,
  loading: false,
  useGif: false,
  setUseGif: null,
  data: undefined,
  showResults: false,
  setShowResults: null,
});

export default AppContext;
