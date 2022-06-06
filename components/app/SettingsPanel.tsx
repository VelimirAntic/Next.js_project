import React, { useContext } from "react";
import { BsArrowRightShort, BsFillCheckCircleFill } from "react-icons/bs";
import AppContext from "../../context/AppContext";
import PlanI from "../../types/admin/PlanI";
import Button from "../Button";
import LayerPanel from "./LayerPanel";
import LayersPanel from "./LayersPanel";
import ProjectPanel from "./ProjectPanel";

interface SettingsPanelProps {
  startGenerating: any;
  freePlan: PlanI | undefined;
}

const SettingsPanel = ({ startGenerating, freePlan }: SettingsPanelProps) => {
  const { collectionSize, data, setShowResults } = useContext(AppContext);
  const freePlanSize = freePlan?.assetsNumber || 0;

  return (
    <div className="settings-panel">
      <div className="container-fluid settings-container">
        <div className="row">
          {/* {data && (
            <div className="text-end mb-4">
              <Button
                theme="white"
                className="btn-sm"
                onClick={() => setShowResults(true)}
              >
                Back To Results <BsArrowRightShort />
              </Button>
            </div>
          )} */}

          {/* Layers settings */}
          <div className="col-lg-9">
            <div className="pt-4 pb-4">
              <div className="row">
                <div className="col-lg-5">
                  <div className="sticky-panel">
                    <LayersPanel />
                    <div className="text-center">
                      <Button
                        onClick={startGenerating}
                        theme="white"
                        className="mt-3"
                      >
                        <BsFillCheckCircleFill size={18} />
                        {collectionSize > freePlanSize && " Pay &"} Generate
                        Collection
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 middle-section">
                  <LayerPanel />
                </div>
              </div>
            </div>
          </div>

          {/* Project settings */}
          <div className="col-lg-3">
            <div className="pt-4 pb-4">
              <ProjectPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
