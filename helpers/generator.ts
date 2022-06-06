import { dataURItoBlob } from "../services/generate";
import {
  format,
  background,
  rarityDelimiter,
  shuffleLayerConfigurations,
  extraMetadata,
  text,
  network,
  solanaMetadata,
  gif,
} from "./config";
import { NETWORK } from "./constants";
import { createGif } from "./giffer";
const sha1 = require("sha1");

var canvas: any, ctx: any;

var metadataList: any = [];
var attributesList: any = [];
var dnaList = new Set();
const DNA_DELIMITER = "-";

let giffer: any = null;

const cleanDna = (_str: any) => {
  const withoutOptions = removeQueryStrings(_str);
  var dna = Number(withoutOptions.split(":").shift());
  return dna;
};

const cleanName = (_str: any) => {
  let nameWithoutExtension = _str.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  return nameWithoutWeight;
};

const getElements = (images: any) => {
  return images.map(({ data_url, file, rarity }: any, index: any) => ({
    id: index,
    name: cleanName(file.name),
    filename: file.name,
    path: data_url,
    weight: rarity,
  }));
};

const layersSetup = (layersOrder: any) => {
  const layers = layersOrder.map((layerObj: any, index: any) => {
    return {
      id: index,
      elements: getElements(layerObj.images),
      name:
        layerObj.options?.["displayName"] != undefined
          ? layerObj.options?.["displayName"]
          : layerObj.name,
      blend:
        layerObj.options?.["blend"] != undefined
          ? layerObj.options?.["blend"]
          : "source-over",
      opacity:
        layerObj.options?.["opacity"] != undefined
          ? layerObj.options?.["opacity"]
          : 1,
      bypassDNA:
        layerObj.options?.["bypassDNA"] !== undefined
          ? layerObj.options?.["bypassDNA"]
          : false,
    };
  });
  return layers;
};

const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
  return pastel;
};

const drawBackground = (width: any, height: any) => {
  ctx.fillStyle = background.static ? background.default : genColor();
  ctx.fillRect(0, 0, width, height);
};

const addMetadata = (
  _dna: any,
  _edition: any,
  namePrefix: any,
  description: any
) => {
  let dateTime = Date.now();
  let tempMetadata: any = {
    name: `${namePrefix} #${_edition}`,
    description: description,
    image: `${_edition}.png`,
    dna: sha1(_dna),
    edition: _edition,
    date: dateTime,
    ...extraMetadata,
    attributes: attributesList,
  };
  if (network == NETWORK.sol) {
    tempMetadata = {
      //Added metadata for solana
      name: tempMetadata.name,
      symbol: solanaMetadata.symbol,
      description: tempMetadata.description,
      //Added metadata for solana
      seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
      image: `image.png`,
      //Added metadata for solana
      external_url: solanaMetadata.external_url,
      edition: _edition,
      ...extraMetadata,
      attributes: tempMetadata.attributes,
      properties: {
        files: [
          {
            uri: "image.png",
            type: "image/png",
          },
        ],
        category: "image",
        creators: solanaMetadata.creators,
      },
    };
  }
  metadataList.push(tempMetadata);
  attributesList = [];
};

const addAttributes = (_element: any) => {
  let selectedElement = _element.layer.selectedElement;
  attributesList.push({
    trait_type: _element.layer.name,
    value: selectedElement.name,
  });
};

const loadLayerImg = async (_layer: any) => {
  return new Promise(async (resolve) => {
    const image = new Image();
    image.src = _layer.selectedElement.path;
    // const image = await loadImage(_layer.selectedElement.path);
    resolve({ layer: _layer, loadedImage: image });
  });
};

const addText = (_sig: any, x: any, y: any, size: any) => {
  ctx.fillStyle = text.color;
  ctx.font = `${text.weight} ${size}pt ${text.family}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;
  ctx.fillText(_sig, x, y);
};

const drawElement = (
  _renderObject: any,
  _index: any,
  _layersLen: any,
  width: any,
  height: any
) => {
  ctx.globalAlpha = _renderObject.layer.opacity;
  ctx.globalCompositeOperation = _renderObject.layer.blend;
  text.only
    ? addText(
        `${_renderObject.layer.name}${text.spacer}${_renderObject.layer.selectedElement.name}`,
        text.xGap,
        text.yGap * (_index + 1),
        text.size
      )
    : ctx.drawImage(_renderObject.loadedImage, 0, 0, width, height);

  addAttributes(_renderObject);
};

const constructLayerToDna = (_dna = "", _layers = []) => {
  let mappedDnaToLayers = _layers.map((layer: any, index) => {
    let selectedElement = layer.elements.find(
      (e: any) => e.id == cleanDna(_dna.split(DNA_DELIMITER)[index])
    );
    return {
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      selectedElement: selectedElement,
    };
  });
  return mappedDnaToLayers;
};

/**
 * In some cases a DNA string may contain optional query parameters for options
 * such as bypassing the DNA isUnique check, this function filters out those
 * items without modifying the stored DNA.
 *
 * @param {String} _dna New DNA string
 * @returns new DNA string with any items that should be filtered, removed.
 */
const filterDNAOptions = (_dna: any) => {
  const dnaItems = _dna.split(DNA_DELIMITER);
  const filteredDNA = dnaItems.filter((element: any) => {
    const query = /(\?.*$)/;
    const querystring = query.exec(element);
    if (!querystring) {
      return true;
    }
    const options: any = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);

    return options.bypassDNA;
  });

  return filteredDNA.join(DNA_DELIMITER);
};

/**
 * Cleaning function for DNA strings. When DNA strings include an option, it
 * is added to the filename with a ?setting=value query string. It needs to be
 * removed to properly access the file name before Drawing.
 *
 * @param {String} _dna The entire newDNA string
 * @returns Cleaned DNA string without querystring parameters.
 */
const removeQueryStrings = (_dna: any) => {
  const query = /(\?.*$)/;
  return _dna.replace(query, "");
};

const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
  const _filteredDNA = filterDNAOptions(_dna);
  return !_DnaList.has(_filteredDNA);
};

const createDna = (_layers: any) => {
  let randNum: any = [];
  _layers.forEach((layer: any) => {
    var totalWeight = 0;
    layer.elements.forEach((element: any) => {
      totalWeight += element.weight;
    });
    // number between 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight);
    for (var i = 0; i < layer.elements.length; i++) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= layer.elements[i].weight;
      if (random < 0) {
        return randNum.push(
          `${layer.elements[i].id}:${layer.elements[i].filename}${
            layer.bypassDNA ? "?bypassDNA=true" : ""
          }`
        );
      }
    }
  });
  return randNum.join(DNA_DELIMITER);
};

function shuffle(array: any) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const startCreating = async (
  layerConfigurations: any,
  namePrefix: any,
  description: any,
  width: any,
  height: any,
  useGif: any,
  callback: any
) => {
  try {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = format.smoothing;

    metadataList = [];

    const data: any = {
      collections: [],
      metadata: null,
    };

    let layerConfigIndex = 0;
    let abstractedIndexes: any = [];

    for (
      let i = network == NETWORK.sol ? 0 : 1;
      i <=
      layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo;
      i++
    ) {
      abstractedIndexes.push(i);
    }

    if (shuffleLayerConfigurations) {
      abstractedIndexes = shuffle(abstractedIndexes);
    }

    const layers = layersSetup(
      layerConfigurations[layerConfigIndex].layersOrder
    );

    let i = 0;

    const func = async () => {
      if (i < layerConfigurations[layerConfigIndex].growEditionSizeTo) {
        let newDna = createDna(layers);
        let results = constructLayerToDna(newDna, layers);
        let loadedElements: any = [];

        await Promise.all(
          results.map(async (layer) => {
            const i = await loadLayerImg(layer);
            loadedElements.push(i);
          })
        );

        await Promise.all(loadedElements).then(async (renderObjectArray) => {
          let gifBuffer;

          ctx.clearRect(0, 0, width, height);

          if (background.generate) {
            drawBackground(width, height);
          }

          const gifArray: any = [];

          renderObjectArray.forEach((renderObject, index) => {
            drawElement(
              renderObject,
              index,
              layerConfigurations[layerConfigIndex].layersOrder.length,
              width,
              height
            );
            if (useGif) {
              gifArray.push(canvas.toDataURL());
            }
          });

          if (useGif) {
            const obj: any = await createGif({
              gifArray,
              width,
              height,
            });

            gifBuffer = dataURItoBlob(obj.image);
          }

          addMetadata(newDna, abstractedIndexes[0], namePrefix, description);

          data.collections.push({
            image: canvas.toDataURL("image/png"),
            meta: metadataList.find(
              (meta: any) => meta.edition == abstractedIndexes[0]
            ),
            gif: gifBuffer,
          });
        });

        dnaList.add(filterDNAOptions(newDna));
        abstractedIndexes.shift();

        set();
      } else {
        data.metadata = metadataList;
        callback(data);
      }
    };

    const set = async () => {
      setTimeout(async () => {
        await func();
        i++;
      }, 1);
    };

    set();
  } catch (error) {
    throw error;
  }
};

export { startCreating, getElements };
