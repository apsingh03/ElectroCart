import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FilterCheckBox from "./FilterCheckBox";
import PriceFilter from "./PriceFilter";
import { AppContext } from "../../../context/AppContext";
import { useProductsFilterFunctions } from "../../../customHooks/ProductsFilterPage/ProductFilterCustomHook";
import { convertInInr } from "../../../utils/productDiscountCalculate";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LeftSideComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedFilters,
    setSelectedFilters,
    productsIsFilteringLoader,
    setproductsIsFilteringLoader,
    handleFilterChange,
    removeFilter,
    handleCheckboxChange,
    handlePriceChange,
    handleSizeChange,
    updateURL,
  } = useProductsFilterFunctions();

  const dispatch = useDispatch();
  // const { setisLoadingTopProgress } = useContext(AppContext);

  const client_sizesFiltersRedux = useSelector(
    (state) => state.client_product?.sizesFilters
  );

  const client_productFiltersRedux = useSelector(
    (state) => state.client_product?.productFilters
  );

  const isLoadingClient_productFiltersRedux =
    !client_productFiltersRedux?.query || !client_productFiltersRedux?.query;

  // console.log(
  //   "isLoadingClient_productFiltersRedux - ",
  //   isLoadingClient_productFiltersRedux
  // );

  const [isFilterChildRadiosVisible, setIsFilterChildRadiosVisible] = useState(
    {}
  );

  const handleFilterToggle = (id) => {
    setIsFilterChildRadiosVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // console.log("searchParams - ", searchParams);
    const category = searchParams.getAll("filter.category");
    const brand = searchParams.getAll("filter.brand");
    const color = searchParams.getAll("filter.color");
    const size = searchParams.getAll("filter.size");
    const priceGte = searchParams.get("filter.price.gte");
    const priceLte = searchParams.get("filter.price.lte");

    setSelectedFilters({
      category,
      brand,
      color,
      size,
      price: {
        gte: priceGte,
        lte: priceLte,
      },
    });
  }, [location.search]);

  return (
    <div className="pFilterPage__left">
      <div className="d-flex flex-row justify-content-between align-items-baseline">
        <h6 className="pFilterPage__left__title">Filter</h6>
      </div>

      <div className="pFilterPage__left__pathNames">
        {selectedFilters.category.map((category, idx) => (
          <div className="pFilterPage__left__pathNames__wrapper" key={idx}>
            <p className="pFilterPage__left__pathNames__wrapper__text">
              {category}
            </p>
            <span
              className="pFilterPage__left__pathNames__wrapper__icon"
              onClick={() => removeFilter("category", category)}
            >
              &#10006;
            </span>{" "}
          </div>
        ))}
        {selectedFilters.brand.map((brand, idx) => (
          <div className="pFilterPage__left__pathNames__wrapper" key={idx}>
            <p className="pFilterPage__left__pathNames__wrapper__text">
              {brand}
            </p>
            <span
              className="pFilterPage__left__pathNames__wrapper__icon"
              onClick={() => removeFilter("brand", brand)}
            >
              &#10006;
            </span>{" "}
          </div>
        ))}

        {selectedFilters.color.map((color, idx) => (
          <div className="pFilterPage__left__pathNames__wrapper" key={idx}>
            <p className="pFilterPage__left__pathNames__wrapper__text">
              {color}
            </p>
            <span
              className="pFilterPage__left__pathNames__wrapper__icon"
              onClick={() => removeFilter("color", color)}
            >
              &#10006;
            </span>{" "}
          </div>
        ))}
        {selectedFilters.size.map((size, idx) => (
          <div className="pFilterPage__left__pathNames__wrapper" key={idx}>
            <p className="pFilterPage__left__pathNames__wrapper__text">
              Size - {size}
            </p>
            <span
              className="pFilterPage__left__pathNames__wrapper__icon"
              onClick={() => removeFilter("size", size)}
            >
              &#10006;
            </span>{" "}
          </div>
        ))}

        {selectedFilters.price.gte && (
          <div className="pFilterPage__left__pathNames__wrapper">
            <p className="pFilterPage__left__pathNames__wrapper__text">
              Price <span>&#8805;</span> {"  "} <span>&#8377;</span>
              {selectedFilters.price.gte}
            </p>
            <span
              className="pFilterPage__left__pathNames__wrapper__icon"
              onClick={() => removeFilter("price", "gte")}
            >
              &#10006;
            </span>{" "}
          </div>
        )}
        {selectedFilters.price.lte && (
          <div className="pFilterPage__left__pathNames__wrapper">
            <p className="pFilterPage__left__pathNames__wrapper__text">
              Price <span>&#8804;</span> <span>&#8377;</span>
              {selectedFilters.price.lte}{" "}
            </p>
            <span
              className="pFilterPage__left__pathNames__wrapper__icon"
              onClick={() => removeFilter("price", "lte")}
            >
              &#10006;
            </span>{" "}
          </div>
        )}
      </div>

      <div className="pFilterPage__left__filtersBox">
        {(function () {
          try {
            if (isLoadingClient_productFiltersRedux) {
              return [...Array(3)].map((_, index) => (
                <div
                  className="pFilterPage__left__filtersBox__card"
                  key={index}
                >
                  <div className="pFilterPage__left__filtersBox__card__wrapper">
                    <Skeleton width={60} />
                    <Skeleton width={20} />
                  </div>
                </div>
              ));
            } else {
              return (
                client_productFiltersRedux.query &&
                client_productFiltersRedux.query.map((data, index) => {
                  return (
                    <div
                      className="pFilterPage__left__filtersBox__card"
                      key={index}
                    >
                      <div
                        className="pFilterPage__left__filtersBox__card__wrapper"
                        onClick={() => handleFilterToggle(index)}
                      >
                        <div className="pFilterPage__left__filtersBox__card__title">
                          <p> {data.name && data.name} </p>
                        </div>
                        <div className="pFilterPage__left__filtersBox__card__icon">
                          {" "}
                          {isFilterChildRadiosVisible[index] ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}{" "}
                        </div>
                      </div>

                      <div
                        className={`pFilterPage__left__filtersBox__card__childRadios ${
                          isFilterChildRadiosVisible[index]
                            ? "visible"
                            : "hidden"
                        } `}
                      >
                        <FilterCheckBox
                          filterChildData={data?.filterChildData}
                          handleCheckboxChange={handleCheckboxChange}
                          filterName={data?.name.toLowerCase()}
                          selectedFilters={selectedFilters}
                        />
                      </div>
                    </div>
                  );
                })
              );
            }
          } catch (error) {
            console.log("Filter Error - ", error);
          }
        })()}
        <div className="pFilterPage__left__filtersBox__card">
          <div
            className="pFilterPage__left__filtersBox__card__wrapper"
            onClick={() => handleFilterToggle("sizes")}
          >
            <div className="pFilterPage__left__filtersBox__card__title">
              <p> Sizes </p>
            </div>
            <div className="pFilterPage__left__filtersBox__card__icon">
              {" "}
              {isFilterChildRadiosVisible["sizes"] ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}{" "}
            </div>
          </div>

          <div
            className={`pFilterPage__left__filtersBox__card__sizes   ${
              isFilterChildRadiosVisible["sizes"] ? "visible" : "hidden"
            } `}
          >
            {(function () {
              try {
                return (
                  client_sizesFiltersRedux.query &&
                  client_sizesFiltersRedux.query.map((size, idx) => {
                    return (
                      <Link
                        className={`pFilterPage__left__filtersBox__card__sizes__card ${
                          selectedFilters["size"] &&
                          selectedFilters["size"].includes(size?.name)
                            ? "active"
                            : null
                        } `}
                        key={idx}
                        onClick={(e) => handleSizeChange(e, size?.name)}
                      >
                        {size?.name}
                      </Link>
                    );
                  })
                );
              } catch (error) {
                console.log("Error - ", error.message);
              }
            })()}
          </div>
        </div>

        <div className="pFilterPage__left__filtersBox__card">
          <div
            className="pFilterPage__left__filtersBox__card__wrapper"
            onClick={() => handleFilterToggle("price")}
          >
            <div className="pFilterPage__left__filtersBox__card__title">
              <p> Price </p>
            </div>
            <div className="pFilterPage__left__filtersBox__card__icon">
              {" "}
              {isFilterChildRadiosVisible["price"] ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}{" "}
            </div>
          </div>

          <div
            className={`pFilterPage__left__filtersBox__card__sizes   ${
              isFilterChildRadiosVisible["price"] ? "visible" : "hidden"
            } `}
          >
            <PriceFilter
              handlePriceChange={handlePriceChange}
              selectedFilters={selectedFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideComponent;
