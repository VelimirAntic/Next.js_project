import { toast } from "react-toastify";

export const showToast = (
  message: string,
  type: "info" | "success" | "warning" | "error" | "default"
) => {
  toast(message, {
    type,
    hideProgressBar: true,
  });
};

const DNA_DELIMITER = "-";
const rarityDelimiter = "#";

export const filterDNAOptions = (_dna: any) => {
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

export const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
  const _filteredDNA = filterDNAOptions(_dna);
  return !_DnaList.has(_filteredDNA);
};

export const createDna = (_layers: any) => {
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

export const layersSetup = (layersOrder: any) => {
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

const getElements = (images: any) => {
  return images.map((image: any, index: any) => {
    const { file, rarity } = image;
    return {
      id: index,
      name: cleanName(file.name),
      filename: file.name,
      weight: rarity,
    };
  });
};

const cleanName = (_str: any) => {
  let nameWithoutExtension = _str.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  return nameWithoutWeight;
};
