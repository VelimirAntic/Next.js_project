import React from "react";
import { BsCheck } from "react-icons/bs";
import PlanI from "../types/admin/PlanI";
import Button from "./Button";

interface PlanBlockProps {
  plan: PlanI;
}

const PlanBlock = ({ plan }: PlanBlockProps) => {
  const { assetsNumber, price, features } = plan;

  return (
    <div className="plan-block">
      <div className="top">
        <div className="up-to">UP TO</div>
        <div className="plan-size">{assetsNumber}</div>
        <div className="asset-generated">Asset Generated</div>
        <span className="plan-price">{price === 0 ? "Free" : "$" + price}</span>
        <br />
        <i className="per-collection">Per Collection</i>
      </div>

      <ul className="plan-features">
        {features.map((feature) => (
          <li key={`plan-feature-${feature}`}>
            <BsCheck /> {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanBlock;
