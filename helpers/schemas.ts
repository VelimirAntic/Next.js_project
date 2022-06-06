import * as Yup from "yup";
import { errorMessages } from "./constants";

Yup.addMethod(
  Yup.array,
  "unique",
  function (message, mapper = (a: any) => a.name) {
    return this.test("unique", message, function (list: any) {
      return list.length === new Set(list.map(mapper)).size;
    });
  }
);

const schema = Yup.object().shape({
  collectionName: Yup.string().required(errorMessages.collectionName),
  collectionDesc: Yup.string().required(errorMessages.collectionDesc),
  collectionSize: Yup.number()
    .min(1, errorMessages.collectionSizeMin)
    .max(10000, errorMessages.collectionSizeMax),
  width: Yup.number().min(50, errorMessages.width),
  height: Yup.number().min(50, errorMessages.height),
  layers: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(errorMessages.layerName),
        images: Yup.array().min(1, errorMessages.layerImages),
      })
    )
    .unique("Layer name must be unique")
    .min(1, errorMessages.layers),
});

const collectionNameSchema = Yup.object().shape({
  collectionName: Yup.string().required(errorMessages.collectionName),
});

const collectionDescSchema = Yup.object().shape({
  collectionDesc: Yup.string().required(errorMessages.collectionDesc),
});

const collectionSizeSchema = Yup.object().shape({
  collectionSize: Yup.number()
    .min(1, errorMessages.collectionSizeMin)
    .max(10000, errorMessages.collectionSizeMax),
});

const widthSchema = Yup.object().shape({
  width: Yup.number().min(50, errorMessages.width),
});

const heightSchema = Yup.object().shape({
  height: Yup.number().min(50, errorMessages.height),
});

const layersSchema = Yup.object().shape({
  layers: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(errorMessages.layerName),
        images: Yup.array().min(1, errorMessages.layerImages),
      })
    )
    .unique("Layer name must be unique")
    .min(1, errorMessages.layers),
});

const layersNamesSchema = Yup.object().shape({
  layers: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(errorMessages.layerName),
      })
    )
    .unique("Layer name must be unique")
    .min(1, errorMessages.layers),
});

export {
  schema,
  collectionNameSchema,
  collectionDescSchema,
  collectionSizeSchema,
  widthSchema,
  heightSchema,
  layersSchema,
  layersNamesSchema,
};
