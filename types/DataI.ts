import CollectionI from "./CollectionI";

export default interface DataI {
  collections: CollectionI[];
  metadata: any;
  zipFile?: any;
}
