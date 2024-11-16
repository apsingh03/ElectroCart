import React, { useEffect } from "react";

const FilterCheckBox = ({
  filterChildData,
  handleCheckboxChange,
  filterName,
  selectedFilters,
}) => {
  return (
    filterChildData &&
    filterChildData.map((subData, subIdx) => {
      // console.log("subData - ", subData);
      return (
        <div
          className="pFilterPage__left__filtersBox__card__childRadios__card"
          key={subIdx}
        >
          <input
            type="checkbox"
            // name="filterCategory"
            onChange={(e) => handleCheckboxChange(e, filterName, subData?.name)}
            id={`${subData?.name}${subData?.id}`}
            checked={
              selectedFilters[filterName] &&
              selectedFilters[filterName].includes(subData?.name)
            }
            className="pFilterPage__left__filtersBox__card__childRadios__card__checkBox"
          />
          <label
            htmlFor={`${subData?.name}${subData?.id}`}
            className="pFilterPage__left__filtersBox__card__childRadios__card__label"
          >
            {subData?.name}
          </label>
        </div>
      );
    })
  );
};

export default FilterCheckBox;
