import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const ProductDetailSkelton = () => {
  return (
    <div>
      <div className="productDetail__right__1st mt-3">
        <h6 className="productDetail__right__1st__productTitle">
          <Skeleton height={40} />
        </h6>
      </div>

      <div className="productDetail__right__2nd">
        <div className="productDetail__right__2nd__discountBox">
          <p className="productDetail__right__2nd__discountBox__price">
            <Skeleton width={50} />
          </p>
          <p className="productDetail__right__2nd__discountBox__mrp">
            <Skeleton width={50} />
          </p>
          <p className="productDetail__right__2nd__discountBox__percentOff">
            <Skeleton width={50} />
          </p>
        </div>

        <div className="productDetail__right__2nd__icons">
          <Skeleton width={50} />
        </div>
      </div>

      <div className="productDetail__right__3rd">
        <div>
          <Skeleton width={300} height={25} />
        </div>
        <div>
          <p>
            <Skeleton width={50} />
          </p>
        </div>
      </div>

      <div className="productDetail__right__allColors">
        <div className="d-flex flex-row gap-2">
          <p>
            <Skeleton width={200} />
          </p>
        </div>

        <div className="productDetail__right__allColors__wrapper">
          {[...Array(3)].map((_, sizeIdx) => {
            return (
              <div className={``} key={sizeIdx}>
                <Skeleton width={80} height={50} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="productDetail__right__5thSizes mt-3">
        <div className="d-flex flex-row gap-2">
          <p>
            <Skeleton width={50} />
          </p>
        </div>

        <div className="productDetail__right__5thSizes__allSizes">
          {[...Array(3)].map((sizes, sizeIdx) => {
            // console.log("sizes - ", sizes);
            return (
              <div
                className={`productDetail__right__5thSizes__card `}
                key={sizeIdx}
                style={{ boxShadow: "none", border: "none" }}
              >
                <div>
                  <p title="Size Code">
                    <Skeleton width={50} />
                  </p>

                  <p style={{ marginTop: "-10px" }} title="Product Quantity">
                    <Skeleton width={100} />
                  </p>

                  <p
                    style={{
                      marginTop: "-10px",
                      fontSize: "10px",
                    }}
                  >
                    <Skeleton width={100} />
                  </p>
                  <p
                    style={{
                      marginTop: "-10px",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    <Skeleton width={100} />
                  </p>

                  <p
                    style={{
                      marginTop: "-10px",
                      fontSize: "18px",
                      color: "green",
                    }}
                  >
                    <Skeleton width={100} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="productDetail__right__6thcheckoutBtns mb-4">
        <Skeleton height={50} />

        <Skeleton height={50} />
      </div>

      <div className="productDetail__right__7thIcons">
        {[...Array(4)].map((_, idx) => {
          return (
            <div className="productDetail__right__7thIcons__card" key={idx}>
              <Skeleton width={100} height={50} />
              <Skeleton width={50} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetailSkelton;
