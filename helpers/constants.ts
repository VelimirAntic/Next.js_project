import PlanI from "../types/admin/PlanI";

export const errorMessages = {
  collectionName: "Collection name is required",

  collectionDesc: "Collection description is required",

  collectionSizeMin: "Minimum collection size is 1",
  collectionSizeMax: "Maximum collection size is 10000",

  width: "Items width should be at least 50",
  height: "Items height should be at least 50",

  layers: "Please add at least 1 layer",
  layerName: "Layer name is required",
  layerImages: "Please add at least 1 image in each layer",
};

export const blendList: any = [
  "source-over",
  "source-in",
  "source-out",
  "source-out",
  "destination-over",
  "destination-in",
  "destination-out",
  "destination-atop",
  "lighter",
  "copy",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

export const NETWORK = {
  eth: "eth",
  sol: "sol",
};

export const PLANS: PlanI[] = [
  {
    price: 0,
    id: "52c5227c51f18",
    assetsNumber: 100,
    features: [
      "100 unique combination",
      "Unlimited Previews",
      "Collection Generation",
      "ETH & SOL Metadata",
      "Generated Gif",
      "No watermark",
      "Limited Chat Support",
    ],
  },
  {
    features: [
      "1000 unique combination",
      "Unlimited Previews",
      "Collection Generation",
      "ETH & SOL Metadata",
      "Generated Gif",
      "No watermark",
      "Priority Chat Support",
    ],
    assetsNumber: 1000,
    price: 50,
    id: "29f78262a19fe",
  },
  {
    features: [
      "5000 unique combination",
      "Unlimited Previews",
      "Collection Generation",
      "ETH & SOL Metadata",
      "Generated Gif",
      "No watermark",
      "Priority Chat Support",
    ],
    assetsNumber: 5000,
    price: 60,
    id: "52c5r27b51f18",
  },
  {
    assetsNumber: 10000,
    id: "53c4r27b51e18",
    features: [
      "10000 unique combination",
      "Unlimited Previews",
      "Collection Generation",
      "ETH & SOL Metadata",
      "Generated Gif",
      "No watermark",
      "Priority Chat Support",
    ],
    price: 70,
  },
];
