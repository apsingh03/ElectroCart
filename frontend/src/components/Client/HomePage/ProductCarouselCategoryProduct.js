import React from "react";
import {
  calculateProductDiscount,
  convertInInr,
} from "../../../utils/productDiscountCalculate";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

const ProductCarouselCategoryProduct = ({
  productCategory,
  currentIndex,
  itemsPerPage,
}) => {
  const responsiveItemsPerPageData =
    productCategory &&
    productCategory.slice(currentIndex, currentIndex + itemsPerPage);
  //   console.log("currentData  - ", productCategory.length);
  return (
    <>
      {(function () {
        try {
          {
            return responsiveItemsPerPageData.map((product, prodIndex) => {
              if (
                product.isFavorite === true &&
                product.isPublished === true &&
                product.isRecycleBin === false
              ) {
                const sortedProductSizes = [
                  ...(product.productSizesProduct || []),
                ].sort((a, b) => a.mrp - b.mrp);

                return (
                  <div
                    className="homePage__3rdBox__productsBox__card"
                    key={prodIndex}
                  >
                    {/* <div className="homePage__3rdBox__wrapper__favIcon">
                  <FaRegHeart />{" "}
                </div> */}
                    <Link
                      to={`/product/${
                        product.productCategory && product.productCategory.name
                      }/${product.id}/${product.name}`}
                    >
                      <img
                        src={product.productImage.url1}
                        className="homePage__3rdBox__productsBox__card__image"
                        alt="Product"
                        loading="lazy"
                      />
                    </Link>
                    <p className="homePage__3rdBox__productsBox__card__productTitle">
                      {product.id} {" - "} {product.name}
                    </p>
                    <div className="homePage__3rdBox__productsBox__card__prices">
                      <p>
                        {calculateProductDiscount(
                          sortedProductSizes.length > 0
                            ? sortedProductSizes[0].mrp
                            : 0,
                          sortedProductSizes.length > 0
                            ? sortedProductSizes[0].discountPercent
                            : 0
                        )}
                      </p>
                      <p
                        style={{
                          textDecoration: "line-through",
                        }}
                      >
                        {convertInInr(
                          sortedProductSizes.length > 0
                            ? sortedProductSizes[0].mrp
                            : 0
                        )}
                      </p>
                      <p style={{ color: "#A10E2C" }}>
                        {sortedProductSizes.length > 0
                          ? sortedProductSizes[0].discountPercent
                          : 0}
                        % Off
                      </p>
                    </div>
                  </div>
                );
              }
            });
          }
        } catch (error) {
          console.log("Error - ", error.message);
        }
      })()}
    </>
  );
};

export default ProductCarouselCategoryProduct;
