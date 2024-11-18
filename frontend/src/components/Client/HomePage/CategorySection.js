import React from "react";
// import "./CategorySection.css";
import ProductCard from "./ProductCard";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper";
import "../../../../src/styles/Client/HomePage/ProductCard.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CategorySection = React.memo(
  ({
    title,
    products,
    parentBgColor,
    categoryRelatedImage,
    categoryRelatedImageWidth,
    categoryRelatedImageheight,
    categoryRelatedImageObjectFit,
    categoryRelatedImageAlt,
  }) => {
    // console.log("products - ", products);
    const isLoadingProducts = !products || products.length === 0;
    // console.log(`Rendering ${title}`); // This will log only when props change.

    // useEffect(() => {}, []);

    // console.log(products, "isLoadingProducts - ", isLoadingProducts);

    return (
      <div
        className="category-section"
        style={{ backgroundColor: parentBgColor }}
      >
        <h2 className="category-section__title">{title}</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={15}
          slidesPerView={4} // Number of products visible at a time
          navigation // Adds navigation arrows
          loop={true} // Enables infinite scrolling
          pagination={{ clickable: true }} // Adds pagination dots
          breakpoints={{
            320: { slidesPerView: 1 }, // 1 slide on small screens
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="category-section__swiper"
        >
          {isLoadingProducts
            ? [...Array(5)].map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="product-card">
                    <Skeleton width={250} height={300} />
                  </div>
                </SwiperSlide>
              ))
            : products.map((product, idx) => (
                <SwiperSlide key={idx}>
                  <ProductCard product={product} title={title} />
                </SwiperSlide>
              ))}
        </Swiper>
        <div className="px-1 px-md-2 px-lg-5">
          <img
            src={categoryRelatedImage || ""}
            width={categoryRelatedImageWidth}
            height={categoryRelatedImageheight}
            style={{ objectFit: categoryRelatedImageObjectFit }}
            alt={categoryRelatedImageAlt}
          />
        </div>
      </div>
    );
  }
);

export default CategorySection;

//
