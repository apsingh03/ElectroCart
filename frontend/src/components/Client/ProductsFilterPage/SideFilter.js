import React, { useEffect, useState, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { AppContext } from "../../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import {
  clientGetProductFiltersAsync,
  clientGetSizesFiltersAsync,
} from "../../../Redux/ClientSlices/clientProductSlice";
import { useProductsFilterFunctions } from "../../../customHooks/ProductsFilterPage/ProductFilterCustomHook";

const SideFilter = ({ setIsFilterSideBarVisible }) => {
  const [isSubMenuToggle, setisSubMenuToggle] = useState({});

  const dispatch = useDispatch();

  const handleToggle = (id) => {
    setisSubMenuToggle((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const client_sizesFiltersRedux = useSelector(
    (state) => state.client_product?.sizesFilters
  );

  // console.log("client_sizesFiltersRedux - ", client_sizesFiltersRedux);

  const client_productFiltersRedux = useSelector(
    (state) => state.client_product?.productFilters
  );

  // console.log("client_productFiltersRedux - ", client_productFiltersRedux);

  const { setisLoadingTopProgress } = useContext(AppContext);

  async function fetchFilter() {
    setisLoadingTopProgress(30);

    await dispatch(clientGetProductFiltersAsync());

    await dispatch(clientGetSizesFiltersAsync());

    setisLoadingTopProgress(100);
  }

  const {
    selectedFilters,
    setSelectedFilters,
    productsIsFilteringLoader,
    setproductsIsFilteringLoader,
    // handleFilterChange,
    // removeFilter,
    handleCheckboxChange,
    // handlePriceChange,
    handleSizeChange,
    // updateURL,
  } = useProductsFilterFunctions();

  useEffect(() => {
    fetchFilter();
  }, []);

  return (
    <div className="filterMenu">
      <div className="filterMenu__header">
        <div className="d-flex flex-row" style={{ gap: "10px" }}>
          <h6 className="filterMenu__header__title">Filter</h6>
          <h6 className="filterMenu__header__countingText">
            {" "}
            {selectedFilters?.category.length +
              selectedFilters?.color.length +
              selectedFilters?.size.length}{" "}
          </h6>
        </div>

        <div
          onClick={() => setIsFilterSideBarVisible((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <RxCross2 />
        </div>
      </div>
      <div className="filterMenu__body">
        {client_productFiltersRedux?.query &&
          client_productFiltersRedux?.query.map((filter, idx) => {
            return (
              <div
                className="filterMenu__body__card"
                key={idx}
                onClick={() => handleToggle(filter.id)}
              >
                <div className="filterMenu__body__card__parent ">
                  <div>
                    <span className="filterMenu__body__card__parent__catName">
                      {filter?.name}
                    </span>
                  </div>

                  <div>
                    <span>
                      {isSubMenuToggle[filter.id] ? <FaMinus /> : <FaPlus />}
                    </span>
                  </div>
                </div>

                <div
                  className={`filterMenu__body__child  ${
                    isSubMenuToggle[filter.id]
                      ? "subMenuActive"
                      : "subMenuNotActive"
                  } `}
                >
                  {filter.filterChildData &&
                    filter.filterChildData.map((subFilter, subFilterIdx) => {
                      // console.log("subFilter  - ", subFilter);
                      return (
                        <div
                          className="pFilterPage__left__filtersBox__card__childRadios__card"
                          key={subFilterIdx}
                        >
                          <input
                            type="checkbox"
                            // name="filterCategory"
                            onChange={(e) =>
                              handleCheckboxChange(
                                e,
                                filter?.name.toLowerCase(),
                                subFilter?.name
                              )
                            }
                            id={`${subFilter?.name}${subFilter?.id}`}
                            checked={
                              selectedFilters[filter?.name.toLowerCase()] &&
                              selectedFilters[
                                filter?.name.toLowerCase()
                              ].includes(subFilter?.name)
                            }
                            className="pFilterPage__left__filtersBox__card__childRadios__card__checkBox"
                          />
                          <label
                            htmlFor={`${subFilter?.name}${subFilter?.id}`}
                            className=" filterMenu__body__child__card__label"
                          >
                            {subFilter?.name}{" "}
                            {selectedFilters[filter?.name.toLowerCase()] &&
                            selectedFilters[
                              filter?.name.toLowerCase()
                            ].includes(subFilter?.name)
                              ? true
                              : false}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}

        <div
          className="filterMenu__body__card"
          onClick={() => handleToggle(76867)}
        >
          <div className="filterMenu__body__card__parent ">
            <div>
              <span className="filterMenu__body__card__parent__catName">
                Size
              </span>
            </div>

            <div>
              <span>{isSubMenuToggle[76867] ? <FaMinus /> : <FaPlus />}</span>
            </div>
          </div>

          <div
            className={`filterMenu__body__child  ${
              isSubMenuToggle[76867] ? "subMenuActive" : "subMenuNotActive"
            } `}
          >
            {(function () {
              try {
                return (
                  client_sizesFiltersRedux.query &&
                  client_sizesFiltersRedux.query.map((size, idx) => {
                    return (
                      <div
                        key={idx}
                        className="filterMenu__body__child__card"
                        onClick={(e) => handleSizeChange(e, size?.name)}
                      >
                        <Link>
                          {size?.name}
                          {selectedFilters["size"] &&
                          selectedFilters["size"].includes(size?.name) ? (
                            <TiTick size={20} color="#000" />
                          ) : null}
                        </Link>
                      </div>
                    );
                  })
                );
              } catch (error) {
                console.log("Error - ", error.message);
              }
            })()}
          </div>
        </div>
      </div>

      <div className="filterMenu__footer">
        <div
          className="filterMenu__footer__cancelBtn"
          onClick={() => setIsFilterSideBarVisible((prev) => !prev)}
        >
          <span>cancel</span>
        </div>

        <div className="filterMenu__footer__applyBtn">
          <span>XYZ</span>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
