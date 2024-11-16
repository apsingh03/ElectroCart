import React, { useState, useEffect, useRef } from "react";
import "../../../styles/Client/ProductDetailImages.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const ProductImages = ({ imagesList, isLoadingClientSingleProductRedux }) => {
  // console.log("Images- ", props.prop.loggedUserInfo.fetchedId )

  const [slideIndex, setSlideIndex] = useState(1);
  const navigation = useNavigate();

  function plusSlides(n) {
    // console.log(n)
    setSlideIndex((prev) => prev + n);
    slideShow(slideIndex + n);
  }

  function slideShow(n) {
    // console.log(n);
    if (n > imagesList.length) {
      setSlideIndex(1);
    }

    if (n < 1) {
      setSlideIndex(imagesList.length);
    }
  }

  return (
    <>
      {(function () {
        try {
          if (isLoadingClientSingleProductRedux) {
            return (
              <section className="row  productDetailImagesContainer">
                <div className="col-2   productDetailImagesContainer__left">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="productDetailImagesContainer__left__card"
                    >
                      <Skeleton />
                      {/* <Skeleton height={"100px"} width={"100px"} /> */}
                    </div>
                  ))}
                </div>

                <div className="col-10   productDetailImagesContainer__right">
                  <div className=" productDetailImagesContainer__right__card">
                    <Skeleton />
                    {/* <Skeleton height="87vh" width="380px" /> */}
                  </div>
                </div>
              </section>
            );
          } else {
            return (
              <section className="product-details row">
                <div className="leftSection  col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  {imagesList.map((productImage, index) => {
                    return (
                      <div
                        key={index}
                        className={`imageBox ${
                          index + 1 === slideIndex && "active"
                        } `}
                        onClick={() => setSlideIndex(index + 1)}
                      >
                        <img
                          src={imagesList[index]}
                          alt=""
                          style={{ margin: 0 }}
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="rightSection  col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <div className="product-page-img">
                    {imagesList.map((productImage, index) => {
                      return (
                        <div
                          key={index}
                          className="mySlides"
                          style={{
                            display:
                              index + 1 === slideIndex ? "block" : "none",
                          }}
                        >
                          <div className="numbertext">
                            {index + 1} / {imagesList.length}
                          </div>
                          <img
                            src={imagesList[index]}
                            alt="product Image "
                            loading="lazy"
                          />
                        </div>
                      );
                    })}

                    <a
                      href="#!"
                      className="prev"
                      onClick={() => plusSlides(-1)}
                    >
                      &#10094;
                    </a>
                    <a href="#!" className="next" onClick={() => plusSlides(1)}>
                      &#10095;
                    </a>
                  </div>
                </div>
              </section>
            );
          }
        } catch (error) {}
      })()}
    </>
  );
};

export default ProductImages;
