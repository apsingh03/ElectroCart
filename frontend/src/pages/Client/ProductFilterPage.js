import React, { useEffect, useState, useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import SideBarAllFilters from "../../components/Client/ProductsFilterPage/SideBarAllFilters";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import all modules from swiper/modules
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import {
  clientGetProductFiltersAsync,
  clientGetSizesFiltersAsync,
  clientShowFilteredProductsAsync,
  sortNewestFirstAllProducts,
  sortOldestFirstAllProducts,
  sortPriceHighToLowProducts,
  sortPriceLowToHighProducts,
} from "../../Redux/ClientSlices/clientProductSlice";
import {
  calculateProductDiscount,
  convertInInr,
} from "../../utils/productDiscountCalculate";

import LeftSideComponent from "../../components/Client/ProductsFilterPage/LeftSideComponent";
import { useProductsFilterFunctions } from "../../customHooks/ProductsFilterPage/ProductFilterCustomHook";
import { createUserFavoriteProductAsync } from "../../Redux/UserSlices/FavoriteProduct/FavoriteProductSlice";
const Header = React.lazy(() => import("../../components/Client/Header"));

const ProductFilterPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const {
    selectedFilters,
    setSelectedFilters,
    productsIsFilteringLoader,
    // setproductsIsFilteringLoader,
    // handleFilterChange,
    removeFilter,
    // handleCheckboxChange,
    // handlePriceChange,
    // handleSizeChange,
    // updateURL,
  } = useProductsFilterFunctions();

  // console.log("USE Hook - ", selectedFilters);

  const client_allProductsRedux = useSelector(
    (state) => state.client_product.allProducts
  );

  const isLoadingClient_allProductsRedux =
    !client_allProductsRedux?.query || !client_allProductsRedux?.query;

  // console.log(
  //   "isLoadingClient_allProductsRedux - ",
  //   isLoadingClient_allProductsRedux
  // );

  // console.log(
  //   "client_allProductsRedux - ",
  //   client_allProductsRedux?.query && client_allProductsRedux?.query[0]
  // );

  const user_favoriteProductRedux = useSelector(
    (state) => state.user_favoriteProduct.data?.query
  );

  const clientIsLogged = useSelector(
    (state) => state.client_auth.loggedData.isUserLogged
  );

  const { setisLoadingTopProgress, isLoadingWishList, setisLoadingWishList } =
    useContext(AppContext);

  const [whichTypeOfSortingSelected, setwhichTypeOfSortingSelected] =
    useState("Low to high");

  async function fetchData(filters) {
    setisLoadingTopProgress(30);

    await dispatch(clientGetProductFiltersAsync());

    await dispatch(clientGetSizesFiltersAsync());

    await dispatch(
      clientShowFilteredProductsAsync({
        filters,
      })
    );

    setisLoadingTopProgress(100);
  }

  function sortingOnChange(option) {
    if (option === "Newest First") {
      dispatch(sortNewestFirstAllProducts());
    }

    if (option === "Oldest First") {
      dispatch(sortOldestFirstAllProducts());
    }

    if (option === "Low to high") {
      setwhichTypeOfSortingSelected("Low to high");
      dispatch(sortPriceLowToHighProducts());
    }

    if (option === "High to low") {
      setwhichTypeOfSortingSelected("High to low");
      dispatch(sortPriceHighToLowProducts());
    }
  }

  const [whichProductForFavorite, setwhichProductForFavorite] = useState({});

  async function handleFavoriteBtn(id) {
    if (clientIsLogged) {
      setisLoadingWishList(true);

      setwhichProductForFavorite((prevState) => ({
        ...prevState,
        [id]: true,
      }));

      const actionResult = await dispatch(
        createUserFavoriteProductAsync({ product_id: id })
      );

      if (actionResult.payload?.msg === "success") {
        setisLoadingWishList(false);
        setwhichProductForFavorite((prevState) => ({
          ...prevState,
          [id]: false,
        }));
      }
    } else {
      alert("You Need to Login ");
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // console.log("searchParams - ", searchParams); brandName
    const category = searchParams.getAll("filter.category");
    const brand = searchParams.getAll("filter.brand");
    const color = searchParams.getAll("filter.color");
    const size = searchParams.getAll("filter.size");
    const priceGte = searchParams.get("filter.price.gte");
    const priceLte = searchParams.get("filter.price.lte");

    const filters = {
      category,
      brand,
      color,
      size,
      price: {
        gte: priceGte,
        lte: priceLte,
      },
    };

    fetchData(filters);
  }, [location.pathname]);

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
    <>
      <Header />

      <div className="pFilterPage">
        <div className="row">
          <div className="col-12  col-md-3 d-none d-md-block">
            <LeftSideComponent />
          </div>

          <div className="col-12 d-block d-md-none">
            <SideBarAllFilters sortingOnChange={sortingOnChange} />
          </div>

          <div className="col-12 col-md-9">
            <div className="pFilterPage__right">
              {/* for desktop Mode  */}
              <div className="pFilterPage__right__header d-none d-md-block">
                <div className="pFilterPage__right__header__1st">
                  {/* <h6>Casuals</h6> */}
                </div>
                <div className="pFilterPage__right__header__2nd">
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#131212",
                      }}
                    >
                      {client_allProductsRedux?.query &&
                        client_allProductsRedux?.query.length}{" "}
                      Products
                    </p>
                  </div>
                  <div>
                    <select
                      className="form-select form-select-sm"
                      onChange={(e) => sortingOnChange(e.target.value)}
                    >
                      <option>Sort It</option>
                      <option value="Oldest First"> Oldest First</option>
                      <option value="Newest First"> Newest First</option>
                      <option value="Low to high">Price - Low to high</option>
                      <option value="High to low">Price - High to low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* For mobile mode  */}
              <div className="pFilterPage__right__header d-block d-md-none">
                {/* <div className="pFilterPage__right__header__1st">
                  <h6>selected -</h6>
                </div> */}
                <div
                  className="pFilterPage__right__header__2nd"
                  style={{ marginBottom: "10px" }}
                >
                  <div>
                    <div className="pFilterPage__left__pathNames">
                      {selectedFilters.category.map((category, idx) => (
                        <div
                          className="pFilterPage__left__pathNames__wrapper"
                          key={idx}
                        >
                          <p className="pFilterPage__left__pathNames__wrapper__text">
                            {category}%
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
                        <div
                          className="pFilterPage__left__pathNames__wrapper"
                          key={idx}
                        >
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
                        <div
                          className="pFilterPage__left__pathNames__wrapper"
                          key={idx}
                        >
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
                        <div
                          className="pFilterPage__left__pathNames__wrapper"
                          key={idx}
                        >
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
                            Price ≤ {selectedFilters.price.gte}{" "}
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
                            Price ≤ {selectedFilters.price.lte}{" "}
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
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#131212",
                        textAlign: "center",
                      }}
                    >
                      {client_allProductsRedux?.query &&
                        client_allProductsRedux?.query.length}{" "}
                      Products
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {productsIsFilteringLoader && (
                  <div className="pFilterPage__right__loader">
                    {" "}
                    <div className="spinner-border" role="status"></div>{" "}
                  </div>
                )}

                {productsIsFilteringLoader === false ? (
                  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
                    <div className="pFilterPage__right__body">
                      <div className="row">
                        {isLoadingClient_allProductsRedux
                          ? // Render skeletons when loading
                            [...Array(8)].map((_, index) => (
                              <div
                                key={index}
                                className="col-6 col-lg-4 col-xl-3 mb-2 p-1"
                              >
                                <Skeleton
                                  height={200}
                                  className="pFilterPage__right__body__card"
                                />
                                <Skeleton
                                  width="80%"
                                  height={20}
                                  style={{ margin: "10px 0" }}
                                />
                                <Skeleton width="60%" height={20} />
                                <Skeleton
                                  width="30%"
                                  height={20}
                                  style={{ marginTop: "10px" }}
                                />
                              </div>
                            ))
                          : // Render products if data is loaded
                            client_allProductsRedux.query &&
                            client_allProductsRedux.query.map(
                              (product, index) => {
                                const sortedProductSizes = [
                                  ...(product.productSizesProduct || []),
                                ];
                                const { url1, url2 } =
                                  product.productImage || {};
                                const productImagesArray = [url1, url2];

                                if (
                                  product.isPublished &&
                                  !product.isRecycleBin
                                ) {
                                  return (
                                    <div
                                      className="col-6 col-lg-4 col-xl-3 mb-2 p-1"
                                      key={index}
                                    >
                                      <div className="pFilterPage__right__body__card">
                                        <div className="pFilterPage__right__body__card__favIcon">
                                          {(function () {
                                            const alreadyFavorite =
                                              user_favoriteProductRedux &&
                                              user_favoriteProductRedux.some(
                                                (data) => {
                                                  return (
                                                    data.product_id ===
                                                    product?.id
                                                  );
                                                }
                                              );

                                            try {
                                              return alreadyFavorite ? (
                                                <span title="Its Favorite">
                                                  <MdFavorite />
                                                </span>
                                              ) : (
                                                <>
                                                  {whichProductForFavorite[
                                                    product?.id
                                                  ] ? (
                                                    isLoadingWishList ? (
                                                      <div
                                                        className="spinner-border spinner-border-sm"
                                                        role="status"
                                                      ></div>
                                                    ) : null
                                                  ) : (
                                                    <span
                                                      title="Favorite It"
                                                      onClick={() =>
                                                        handleFavoriteBtn(
                                                          product?.id
                                                        )
                                                      }
                                                    >
                                                      <FaRegHeart />
                                                    </span>
                                                  )}
                                                </>
                                              );
                                            } catch (error) {
                                              console.log(
                                                "Error - ",
                                                error.message
                                              );
                                            }
                                          })()}
                                        </div>

                                        <Link
                                          to={`/product/${product.productCategory?.name}/${product.id}/${product.name}`}
                                        >
                                          <div>
                                            <Swiper
                                              modules={[Navigation, Pagination]}
                                              // spaceBetween={15}
                                              slidesPerView={1}
                                              navigation
                                              loop
                                              className="category-section__swiper"
                                            >
                                              {productImagesArray.map(
                                                (image, imgIdx) => (
                                                  <SwiperSlide key={imgIdx}>
                                                    <img
                                                      src={image}
                                                      className="pFilterPage__right__body__card__image"
                                                      alt="product"
                                                      loading="lazy"
                                                    />
                                                  </SwiperSlide>
                                                )
                                              )}
                                            </Swiper>
                                          </div>

                                          <p className="pFilterPage__right__body__card__productTitle">
                                            {product?.name}
                                          </p>

                                          <div
                                            className="d-flex flex-row align-items-center gap-1 justify-content-between"
                                            style={{ marginTop: "-20px" }}
                                          >
                                            <p className="pFilterPage__right__body__card__productTitle d-block">
                                              {product?.productCategory?.name}
                                              {" | "}{" "}
                                              {product?.productBrand?.name}
                                            </p>

                                            <div>
                                              {product?.productColorsProduct?.map(
                                                (color, idx) => (
                                                  <span
                                                    key={idx}
                                                    title={`${color?.productColorsColor?.name}`}
                                                    style={{
                                                      width: "15px",
                                                      height: "15px",
                                                      borderRadius: "50%",
                                                      backgroundColor:
                                                        color
                                                          ?.productColorsColor
                                                          ?.name,
                                                      display: "inline-block",
                                                      cursor: "pointer",
                                                      marginRight: "5px",
                                                      border: "1px solid #000",
                                                    }}
                                                  />
                                                )
                                              )}
                                            </div>
                                          </div>

                                          <p
                                            className="pFilterPage__right__body__card__productTitle"
                                            style={{ marginTop: "-10px" }}
                                          >
                                            Sizes -{" "}
                                            {product?.productSizesProduct?.map(
                                              (psize, idx) => (
                                                <span key={idx}>
                                                  {
                                                    psize?.pSizeProductSizes
                                                      ?.name
                                                  }
                                                  ,{" "}
                                                </span>
                                              )
                                            )}
                                          </p>
                                        </Link>

                                        <div className="pFilterPage__right__body__card__prices">
                                          <p>
                                            {calculateProductDiscount(
                                              sortedProductSizes[0]?.mrp || 0,
                                              sortedProductSizes[0]
                                                ?.discountPercent || 0
                                            )}
                                          </p>
                                          <p
                                            style={{
                                              textDecoration: "line-through",
                                            }}
                                          >
                                            {convertInInr(
                                              sortedProductSizes[0]?.mrp || 0
                                            )}
                                          </p>
                                          <p style={{ color: "#A10E2C" }}>
                                            {sortedProductSizes[0]
                                              ?.discountPercent || 0}
                                            % Off
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              }
                            )}
                      </div>
                    </div>
                  </SkeletonTheme>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilterPage;
