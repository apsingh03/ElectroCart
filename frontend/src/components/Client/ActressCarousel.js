import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ActressCarousel = ({ actressCarouselRedux }) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  try {
    if (!actressCarouselRedux) return null;

    return (
      <div className="actressCarouselContainer">
        <button
          className="scrollButton prevButton"
          onClick={() => scroll("left")}
        >
          <IoIosArrowBack size={25} color="#fff" />
        </button>
        <div className="actressCarousel" ref={carouselRef}>
          {actressCarouselRedux.map((parentCarousel, parentIdx) => {
            return (
              <section className="actressCarouselSection" key={parentIdx}>
                <div className="actressCarouselContent">
                  {parentCarousel?.actressCarouselActressCarouselImages?.map(
                    (childData, childIdx) => {
                      return (
                        <div className="actressCarousel__card" key={childIdx}>
                          <div className="actressCarousel__card__imgBox">
                            <Link to={`${childData?.routeLink}`}>
                              <img
                                alt={childData?.imageAlt || "Image"}
                                src={childData?.imageSrc || ""}
                                style={{
                                  width: `${parentCarousel?.width || "100px"}`,
                                  height: `${
                                    parentCarousel?.height || "100px"
                                  }`,
                                  objectFit:
                                    parentCarousel?.objectFit || "cover",
                                  borderRadius: "50%",
                                }}
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <p className="actressCarousel__card__title">
                            {childData?.name || "Unknown"}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </section>
            );
          })}
        </div>
        <button
          className="scrollButton nextButton"
          onClick={() => scroll("right")}
        >
          <IoIosArrowForward size={25} color="#fff" />
        </button>
      </div>
    );
  } catch (error) {
    console.error("Error - ", error.message);
    return <div>Error loading carousel</div>;
  }
};

export default ActressCarousel;
