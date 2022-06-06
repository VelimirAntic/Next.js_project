import React, { useEffect, useState } from "react";
import ResultsPanel from "../components/app/ResultsPanel";
import SettingsPanel from "../components/app/SettingsPanel";
import Page from "../components/Page";
import AppContext from "../context/AppContext";
import { dataURLtoFile, generateNFT } from "../services/generate";
import { schema } from "../helpers/schemas";
import {
  createDna,
  filterDNAOptions,
  isDnaUnique,
  layersSetup,
  showToast,
} from "../helpers/utils";
import CollectionI from "../types/CollectionI";
import DataI from "../types/DataI";
import LayerI from "../types/LayerI";
import Loading from "../components/app/Loading";
import Paypal from "../components/Paypal";
import { PLANS } from "../helpers/constants";

const Application = () => {
  const [amount, setAmount] = useState(0);

  // show payment
  const [showPaypal, setShowPaypal] = useState<boolean>(false);

  // data sent
  const [data, setData] = useState<DataI | undefined>();
  const [showResults, setShowResults] = useState<boolean>(false);

  // layers
  const [layers, setLayers] = useState<LayerI[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);

  // project settings
  const [collectionName, setCollectionName] = useState<string>("No Name");
  const [collectionDesc, setCollectionDesc] = useState<string>("Description");
  const [collectionSize, setCollectionSize] = useState<number>(5);
  const [width, setWidth] = useState<number>(512);
  const [height, setHeight] = useState<number>(512);
  const [useGif, setUseGif] = useState<boolean>(false);

  // loading
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if ("indexedDB" in window) {
      let request = window.indexedDB.open("collection", 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        db.createObjectStore("collection", {
          keyPath: "collectionId",
        });
      };

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        var transaction = db.transaction(["collection"]);
        var objectStore = transaction.objectStore("collection");
        var collectionReq = objectStore.get("app-collection");
        collectionReq.onsuccess = (e: any) => {
          const collection = collectionReq.result;
          if (collection) {
            setCollectionName(collection.name);
            setCollectionDesc(collection.description);
            setCollectionSize(collection.size);
            setWidth(collection.width || 0);
            setHeight(collection.height || 0);
            setLayers(collection.layers || []);
            setUseGif(collection.useGif || false);
          }
        };
      };
    }

    // paypal
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
    document.body.appendChild(script);
  }, []);

  // update localstorage
  useEffect(() => {
    if ("indexedDB" in window) {
      const currentCollection: CollectionI = {
        name: collectionName,
        description: collectionDesc,
        size: collectionSize,
        width,
        height,
        layers,
        useGif,
        collectionId: "app-collection",
      };

      let request = window.indexedDB.open("collection", 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        var collectionObjectStore = db
          .transaction(["collection"], "readwrite")
          .objectStore("collection");
        var request = collectionObjectStore.get("app-collection");

        request.onsuccess = (event: any) => {
          collectionObjectStore.put(currentCollection);
        };
      };
    }
  }, [
    collectionName,
    collectionDesc,
    collectionSize,
    width,
    height,
    useGif,
    layers,
  ]);

  // update amount
  useEffect(() => {
    getCollectionPrice();
  }, [collectionSize]);

  // generate collection
  const validation = async (layersClone: any) => {
    try {
      // inputs validation
      await schema.validate({
        collectionName,
        collectionDesc,
        collectionSize,
        width,
        height,
        layers,
      });

      // dna validation
      let layerConfigIndex = 0;
      let failedCount = 0;
      const uniqueDnaTorrance = 10000;
      let editionCount = 1;
      var dnaList = new Set();

      const layerConfigurations = [
        {
          growEditionSizeTo: collectionSize,
          layersOrder: layersClone,
        },
      ];

      while (layerConfigIndex < layerConfigurations.length) {
        const layers = layersSetup(layersClone);

        while (
          editionCount <=
          layerConfigurations[layerConfigIndex].growEditionSizeTo
        ) {
          let newDna = createDna(layers);
          if (isDnaUnique(dnaList, newDna)) {
            dnaList.add(filterDNAOptions(newDna));
            editionCount++;
          } else {
            failedCount++;
            if (failedCount >= uniqueDnaTorrance) {
              const e = new Error(
                `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
              );
              e.name = "ValidationError";
              throw e;
            }
          }
        }

        layerConfigIndex++;
      }
    } catch (error) {
      throw error;
    }
  };

  const startGenerating = async () => {
    try {
      const layersClone: any = [...layers];

      await Promise.all(
        layersClone?.map(async (layer: any) => {
          await Promise.all(
            layer.images?.map(async (image: any) => {
              const extension = image.data_url.substring(
                "data:image/".length,
                image.data_url.indexOf(";base64")
              );

              const file = dataURLtoFile(
                image.data_url,
                `${Math.random().toString(16).slice(2)}.${extension}`
              );

              image.file = file;
            })
          );
        })
      );

      // validation
      await validation(layersClone);

      // payment
      const freePlanSize: any = PLANS.find((p) => p.price === 0)?.assetsNumber;
      if (collectionSize > freePlanSize) return setShowPaypal(true);

      // generating
      await generate();
    } catch (error: any) {
      console.log(error);
      if (error.name !== "ValidationError") setError(error);
      showToast(error.message, "error");
    }
  };

  const generate = async () => {
    try {
      window.scrollTo(0, 0);

      setShowPaypal(false);

      // new collection
      const newCollection: CollectionI = {
        name: collectionName,
        description: collectionDesc,
        size: collectionSize,
        width,
        height,
        layers,
        results: [],
        metadata: [],
        collectionId: Math.random().toString(16).slice(2),
      };

      setLoading(true);

      // call the api
      await generateNFT(newCollection, useGif, (data: any) => {
        // error while generating
        if (data.error) return showToast(data.error, "error");

        // create the collection
        newCollection.results = data.collections;
        newCollection.metadata = data.metadata;

        // nfts generated
        setData(data);
        setShowResults(true);
        setLoading(false);
      });
    } catch (error: any) {
      setLoading(false);
      throw error;
    }
  };

  const handleGenerate = async () => {
    try {
      // generating
      await generate();
    } catch (error: any) {
      console.log(error);
      if (error.name !== "ValidationError") setError(error);
      showToast(error.message, "error");
    }
  };

  const getCollectionPrice = async () => {
    PLANS.map((p, index) => {
      const nextP = PLANS[index + 1];
      if (
        nextP &&
        collectionSize > p.assetsNumber &&
        collectionSize <= nextP.assetsNumber
      ) {
        setAmount(nextP.price);
      }
    });
  };

  const render = () => {
    if (loading) return <Loading />;

    if (error)
      return (
        <ResultsPanel
          data={data}
          setData={setData}
          setError={setError}
          generate={handleGenerate}
        />
      );

    if (showPaypal)
      return (
        <Paypal
          setShowPaypal={setShowPaypal}
          description={collectionName}
          amount={amount}
          generate={handleGenerate}
        />
      );

    if (!showResults)
      return (
        <SettingsPanel
          startGenerating={startGenerating}
          freePlan={PLANS.find((p) => p.price === 0)}
        />
      );

    return (
      <ResultsPanel
        data={data}
        setData={setData}
        setError={setError}
        generate={handleGenerate}
      />
    );
  };

  return (
    <Page title="NFT Generator">
      <AppContext.Provider
        value={{
          layers,
          setLayers,
          activeLayerId,
          setActiveLayerId,
          collectionName,
          setCollectionName,
          collectionDesc,
          setCollectionDesc,
          collectionSize,
          setCollectionSize,
          useGif,
          setUseGif,
          width,
          setWidth,
          height,
          setHeight,
          loading,
          data,
          showResults,
          setShowResults,
        }}
      >
        {render()}
      </AppContext.Provider>
    </Page>
  );
};

export default Application;
