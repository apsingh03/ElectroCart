import React, { useEffect, useState, useContext } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCarouselCategoryProduct from "./ProductCarouselCategoryProduct";

const ProductsCarousel = ({ categoryWiseProductsRedux }) => {
  // we need those for responsive products per page
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setitemsPerPage] = useState(4);
  const [isScreenAtMd, setIsScreenAtMd] = useState(window.innerWidth < 768);
  const [isScreenAtSm, setIsScreenAtSm] = useState(window.innerWidth < 576);

  useEffect(() => {
    // according to window width we are calculating Products per Page
    if (isScreenAtMd) {
      setitemsPerPage(3);
    } else {
      setitemsPerPage(4);
    }

    if (isScreenAtSm) {
      setitemsPerPage(2);
    }

    const handleResize = () => {
      setIsScreenAtMd(window.innerWidth < 768);
      setIsScreenAtSm(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isScreenAtMd, isScreenAtSm]);

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const favoriteCategory =
      categoryWiseProductsRedux &&
      categoryWiseProductsRedux.find(
        (category) => category.isFavorite === true
      );
    // console.log("favoriteCategory - ", favoriteCategory);
    if (favoriteCategory) {
      setCurrentCategoryIndex(favoriteCategory.id);
    }
  }, [categoryWiseProductsRedux]);

  // when category mounted it will fetch the categorySubProducts length
  let subProductCategoryLength = 0;

  const nextOnClick = () => {
    if (currentIndex + itemsPerPage < subProductCategoryLength) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevOnClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <>
      <div className="homePage__3rdBox__productsBox">
        {(function () {
          try {
            return (
              <>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  {categoryWiseProductsRedux &&
                    categoryWiseProductsRedux.map((category, index) =>
                      (function () {
                        if (category.isFavorite === true) {
                          // setCurrentCategoryIndex(category.id);
                          return (
                            <li
                              className="nav-item"
                              role="presentation"
                              key={index}
                            >
                              <button
                                className={`nav-link ${
                                  category.id === currentCategoryIndex
                                    ? "active"
                                    : null
                                }`}
                                id={`tab-${category.id}`}
                                data-bs-toggle="tab"
                                data-bs-target={`#tab-pane-${category.id}`}
                                type="button"
                                role="tab"
                                aria-controls={`tab-pane-${category.id}`}
                                aria-selected={
                                  category.id === currentCategoryIndex
                                    ? "true"
                                    : "false"
                                }
                                onClick={() =>
                                  setCurrentCategoryIndex(category.id)
                                }
                              >
                                {category.name && category.name}
                              </button>
                            </li>
                          );
                        }
                      })()
                    )}
                </ul>

                <div className="tab-content" id="myTabContent">
                  {categoryWiseProductsRedux &&
                    categoryWiseProductsRedux.map((category, index) => {
                      // setting categoryProduct length for next btn handler
                      if (category.id === currentCategoryIndex) {
                        subProductCategoryLength =
                          category?.productCategory?.length;
                      }

                      return (function () {
                        if (category.isFavorite === true) {
                          return (
                            <div
                              key={index}
                              className={`tab-pane fade ${
                                category.id === currentCategoryIndex
                                  ? "show active"
                                  : ""
                              }`}
                              id={`tab-pane-${category.id}`}
                              role="tabpanel"
                              aria-labelledby={`tab-${category.id}`}
                              tabIndex="0"
                            >
                              <div className="homePage__3rdBox__wrapper">
                                <div className="homePage__3rdBox__wrapper__btns">
                                  <button
                                    className="homePage__3rdBox__wrapper__btns__prev"
                                    onClick={prevOnClick}
                                  >
                                    <IoIosArrowBack />
                                  </button>
                                  <button
                                    className="homePage__3rdBox__wrapper__btns__next"
                                    onClick={nextOnClick}
                                  >
                                    <IoIosArrowForward />
                                  </button>
                                </div>

                                <ProductCarouselCategoryProduct
                                  productCategory={
                                    category.productCategory &&
                                    category.productCategory
                                  }
                                  currentIndex={currentIndex}
                                  itemsPerPage={itemsPerPage}
                                  currentCategoryIndex={currentCategoryIndex}
                                />
                              </div>
                            </div>
                          );
                        }
                      })();
                    })}
                </div>

                <div style={{ marginTop: "30px", textAlign: "center" }}>
                  {(function () {
                    const selectedCategoryName =
                      categoryWiseProductsRedux &&
                      categoryWiseProductsRedux.find((category, index) => {
                        return category.id === currentCategoryIndex;
                      });

                    try {
                      return (
                        <Link
                          to={`/collections?filter.category=${selectedCategoryName?.name}`}
                          style={{
                            border: "1px solid #000",
                            padding: "10px 30px",
                            backgroundColor: "transparent",
                            textDecoration: "none",
                            color: "#000",
                          }}
                        >
                          View All
                        </Link>
                      );
                    } catch (error) {
                      console.log("Error - ", error.message);
                    }
                  })()}
                </div>
              </>
            );
          } catch (error) {
            console.log("Error - ", error.message);
          }
        })()}
      </div>
    </>
  );
};

export default ProductsCarousel;
