import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const DressesCarousel = ({ actressCarouselRedux }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    // console.log("carousel - ", carousel);

    if (!carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      console.log("handleMouseDown pageX - ", e.pageX);
        console.log("handleMouseDown carousel - ", carousel.offsetLeft);
      isDown = true;
      carousel.classList.add("active");
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      carousel.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      carousel.classList.remove("active");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      carousel.scrollLeft = scrollLeft - walk;
    };

    carousel.addEventListener("mousedown", handleMouseDown);
    carousel.addEventListener("mouseleave", handleMouseLeave);
    carousel.addEventListener("mouseup", handleMouseUp);
    carousel.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (carousel) {
        carousel.removeEventListener("mousedown", handleMouseDown);
        carousel.removeEventListener("mouseleave", handleMouseLeave);
        carousel.removeEventListener("mouseup", handleMouseUp);
        carousel.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [carouselRef.current]);

  return (
    <div className="dressesCarouselAtlg">
      {actressCarouselRedux &&
        actressCarouselRedux.map((parentCarousel, parentIdx) => (
          <div
            className="dressesCarouselAtlg__wrapper"
            key={parentIdx}
            ref={carouselRef}
          >
            {parentCarousel.actressCarouselActressCarouselImages &&
              parentCarousel.actressCarouselActressCarouselImages.map(
                (childData, childIdx) => (
                  <div
                    className="dressesCarouselAtlg__wrapper__card"
                    key={childIdx}
                  >
                    <div className="dressesCarouselAtlg__wrapper__card__imgBox">
                      <Link to={`${childData.routeLink}`}>
                        <img
                          alt={`${childData?.imageAlt}`}
                          src={`${childData?.imageSrc}`}
                          className="dressesCarouselAtlg__wrapper__card__imgBox__image"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <p className="dressesCarouselAtlg__wrapper__card__title">
                      {childData?.name}
                    </p>
                  </div>
                )
              )}
          </div>
        ))}
    </div>
  );
};

export default DressesCarousel;
