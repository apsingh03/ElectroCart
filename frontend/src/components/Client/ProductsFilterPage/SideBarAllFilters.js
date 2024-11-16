import React, { useEffect, useState, useContext } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BiSortAlt2 } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { AppContext } from "../../../context/AppContext";

const SideBarAllFilters = ({ sortingOnChange }) => {
  const [isSortByVisible, setIsSortByVisible] = useState(false);

  const { isFilterSideBarVisible, setIsFilterSideBarVisible } =
    useContext(AppContext);

  return (
    <div className="sideBarFilter">
      <div
        className="sideBarFilter__divs"
        onClick={() => setIsFilterSideBarVisible(!isFilterSideBarVisible)}
      >
        <div className="sideBarFilter__divs__card">
          <span className="sideBarFilter__divs__card__icon">
            <MdOutlineFilterAlt />
          </span>

          <span className="sideBarFilter__divs__card__title">Filters</span>
        </div>
      </div>

      <div
        className="sideBarFilter__divs"
        onClick={() => setIsSortByVisible(!isSortByVisible)}
      >
        <div className="sideBarFilter__divs__card">
          <div className="sideBarFilter__divs__card__icon">
            <BiSortAlt2 />
          </div>

          <div className="sideBarFilter__divs__card__title">Sort By</div>
        </div>

        {isSortByVisible && (
          <div
            className={`sideBarFilter__divs__card__children ${
              isSortByVisible ? "visible" : null
            } `}
          >
            <div className="sideBarFilter__divs__card__children__header">
              <div></div>
              <h6 className="sideBarFilter__divs__card__children__header__text">
                Sort By
              </h6>
              <div className="sideBarFilter__divs__card__children__header__icon">
                <RxCross2 />
              </div>
            </div>

            <div className="sideBarFilter__divs__card__children__body">
              <div
                className="sideBarFilter__divs__card__children__body__card"
                onClick={() => sortingOnChange("Oldest First")}
              >
                <p className="sideBarFilter__divs__card__children__body__card__text">
                  Oldest First
                </p>
                <div className="sideBarFilter__divs__card__children__body__card__icon">
                  <TiTick />
                </div>
              </div>
              <div
                className="sideBarFilter__divs__card__children__body__card"
                onClick={() => sortingOnChange("Newest First")}
              >
                <p className="sideBarFilter__divs__card__children__body__card__text">
                  Newest First
                </p>
                <div className="sideBarFilter__divs__card__children__body__card__icon">
                  <TiTick />
                </div>
              </div>
              <div
                className="sideBarFilter__divs__card__children__body__card"
                onClick={() => sortingOnChange("Low to high")}
              >
                <p className="sideBarFilter__divs__card__children__body__card__text">
                  Price - Low to high
                </p>
                <div className="sideBarFilter__divs__card__children__body__card__icon">
                  <TiTick />
                </div>
              </div>
              <div
                className="sideBarFilter__divs__card__children__body__card"
                onClick={() => sortingOnChange("High to low")}
              >
                <p className="sideBarFilter__divs__card__children__body__card__text">
                  Price - High to low
                </p>
                <div className="sideBarFilter__divs__card__children__body__card__icon">
                  <TiTick />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarAllFilters;
