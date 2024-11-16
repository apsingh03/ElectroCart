import React, { useState, useEffect } from "react";

import "./PriceSlider.css";
import { convertInInr } from "../../../utils/productDiscountCalculate";
const PriceFilter = ({ handlePriceChange, selectedFilters }) => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(500);

  return (
    <div>
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="10000"
          onChange={(e) => handlePriceChange(e, "gte")}
          value={selectedFilters?.price?.gte || ""}
          className="slider"
        />
        <input
          type="range"
          min="0"
          max="10000"
          onChange={(e) => handlePriceChange(e, "lte")}
          value={selectedFilters?.price?.lte || ""}
          className="slider"
        />
      </div>

      <div className="slider-values">
        <p style={{ fontSize: "12px" }}>
          Min Price: &#8377; {selectedFilters?.price?.gte}
        </p>

        <p style={{ fontSize: "12px" }}>
          Max Price: &#8377; {selectedFilters?.price?.lte}
        </p>
      </div>
    </div>
  );
};

export default PriceFilter;
