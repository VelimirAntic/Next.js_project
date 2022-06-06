import { NETWORK } from "./constants";

const network = NETWORK.sol;

// General metadata for Ethereum
const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "",
  creators: [],
};

const shuffleLayerConfigurations = false;

const format = {
  smoothing: false,
};

const gif = {
  export: true,
  repeat: 0,
  quality: 30,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

export {
  format,
  background,
  uniqueDnaTorrance,
  rarityDelimiter,
  shuffleLayerConfigurations,
  extraMetadata,
  pixelFormat,
  text,
  network,
  solanaMetadata,
  gif,
};
