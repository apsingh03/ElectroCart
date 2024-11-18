import React, { useEffect, useState, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// const BannerCarousel = ({ bannerCarouselRedux }) => {
//   // console.log(
//   //   "bannerCarouselRedux - ",
//   //   bannerCarouselRedux &&
//   //     bannerCarouselRedux[0]?.bannerCarouselBannerCarouselImages
//   // );
//   const [imageCurrentIndex, setimageCurrentIndex] = useState(0);

//   const bannerIsLoading =
//     !bannerCarouselRedux ||
//     !bannerCarouselRedux[0]?.bannerCarouselBannerCarouselImages;

//   // console.log("isLoading - ", isLoading);

//   function prevOnClick(dynamicBannerImagesLength) {
//     if (imageCurrentIndex <= 0) {
//       setimageCurrentIndex(dynamicBannerImagesLength - 1);
//     } else {
//       setimageCurrentIndex((prev) => prev - 1);
//     }
//   }

//   function nextOnClick(dynamicBannerImagesLength) {
//     if (imageCurrentIndex === dynamicBannerImagesLength - 1) {
//       setimageCurrentIndex(0);
//     } else {
//       setimageCurrentIndex((prev) => prev + 1);
//     }
//   }

//   // console.log("bannerImages - ", bannerImages);

//   useEffect(() => {
//     let interval;
//     if (bannerCarouselRedux && bannerCarouselRedux) {
//       bannerCarouselRedux &&
//         bannerCarouselRedux.forEach((carouselParent) => {
//           const dynamicBannerImages =
//             carouselParent.bannerCarouselBannerCarouselImages;

//           if (carouselParent.animation) {
//             const dynamicBannerImagesLength = dynamicBannerImages.length;

//             interval = setInterval(() => {
//               setimageCurrentIndex(
//                 (prev) => (prev + 1) % dynamicBannerImagesLength
//               );
//             }, carouselParent?.timer);
//           }
//         });
//     }

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [bannerCarouselRedux && bannerCarouselRedux]);

//   return (
//     <div className="bannerCarousel">
//       {(function () {
//         try {
//           if (bannerIsLoading) {
//             return <Skeleton width={"100%"} height={"400px"} />;
//           } else {
//             return (
//               bannerCarouselRedux &&
//               bannerCarouselRedux.map((carouselParent, parentIdx) => {
//                 const dynamicBannerImages =
//                   carouselParent.bannerCarouselBannerCarouselImages &&
//                   carouselParent.bannerCarouselBannerCarouselImages;

//                 const dynamicBannerImagesLength = dynamicBannerImages.length;

//                 return (
//                   <div key={parentIdx}>
//                     <div
//                       className="bannerCarousel_imgBox"
//                       style={{ height: `${carouselParent?.height}` }}
//                     >
//                       <div className="bannerCarousel__btns">
//                         <button
//                           className="bannerCarousel__btns__prev"
//                           onClick={() => prevOnClick(dynamicBannerImagesLength)}
//                           aria-label="Previous Slide"
//                         >
//                           <IoIosArrowBack />
//                         </button>
//                         <button
//                           className="bannerCarousel__btns__next"
//                           onClick={() => nextOnClick(dynamicBannerImagesLength)}
//                           aria-label="Next Slide"
//                         >
//                           <IoIosArrowForward />
//                         </button>
//                       </div>

//                       <img
//                         src={`${dynamicBannerImages[imageCurrentIndex]?.imageSrc}`}
//                         alt={`${dynamicBannerImages[imageCurrentIndex]?.imageAlt}`}
//                         className="bannerCarousel_imgBox__image"
//                         style={{
//                           height: `${carouselParent?.height}`,
//                           width: `${carouselParent?.width}`,
//                           objectFit: `${carouselParent?.objectFit}`,
//                         }}
//                         loading="eager"
//                       />
//                     </div>
//                   </div>
//                 );
//               })
//             );
//           }
//         } catch (error) {
//           console.log("Error - ", error.message);
//         }
//       })()}
//     </div>
//   );
// };

const BannerCarousel = React.memo(({ bannerCarouselRedux }) => {
  const [imageCurrentIndex, setImageCurrentIndex] = useState(0);

  // Determine if the banner is still loading
  const bannerIsLoading =
    !bannerCarouselRedux ||
    !bannerCarouselRedux[0]?.bannerCarouselBannerCarouselImages;

  // Preload images for seamless navigation
  useEffect(() => {
    if (bannerCarouselRedux) {
      bannerCarouselRedux.forEach((carouselParent) => {
        const dynamicBannerImages =
          carouselParent.bannerCarouselBannerCarouselImages || [];
        dynamicBannerImages.forEach((image) => {
          const img = new Image();
          img.src = image.imageSrc;
        });
      });
    }
  }, [bannerCarouselRedux]);

  // Set interval for automatic image transition
  useEffect(() => {
    let interval;
    if (bannerCarouselRedux) {
      bannerCarouselRedux.forEach((carouselParent) => {
        if (carouselParent.animation) {
          const dynamicBannerImagesLength =
            carouselParent.bannerCarouselBannerCarouselImages.length;

          interval = setInterval(() => {
            setImageCurrentIndex(
              (prev) => (prev + 1) % dynamicBannerImagesLength
            );
          }, carouselParent?.timer);
        }
      });
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [bannerCarouselRedux]);

  // Prepare data for rendering (moved useMemo outside map)
  const memoizedBannerData = useMemo(() => {
    return (
      bannerCarouselRedux &&
      bannerCarouselRedux.map((carouselParent) => ({
        images: carouselParent.bannerCarouselBannerCarouselImages || [],
        height: carouselParent?.height,
        width: carouselParent?.width,
        objectFit: carouselParent?.objectFit,
      }))
    );
  }, [bannerCarouselRedux]);

  // Handles click for the previous button
  const prevOnClick = (dynamicBannerImagesLength) => {
    setImageCurrentIndex((prev) =>
      prev <= 0 ? dynamicBannerImagesLength - 1 : prev - 1
    );
  };

  // Handles click for the next button
  const nextOnClick = (dynamicBannerImagesLength) => {
    setImageCurrentIndex((prev) =>
      prev === dynamicBannerImagesLength - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bannerCarousel">
      {bannerIsLoading ? (
        // Show skeleton while loading
        <Skeleton width={"100%"} height={"400px"} />
      ) : (
        memoizedBannerData &&
        memoizedBannerData.map((data, idx) => (
          <div key={idx}>
            <div
              className="bannerCarousel_imgBox"
              style={{ height: `${data.height}` }}
            >
              {/* Navigation buttons */}
              <div className="bannerCarousel__btns">
                <button
                  className="bannerCarousel__btns__prev"
                  onClick={() => prevOnClick(data.images.length)}
                  aria-label="Previous Slide"
                >
                  <IoIosArrowBack />
                </button>
                <button
                  className="bannerCarousel__btns__next"
                  onClick={() => nextOnClick(data.images.length)}
                  aria-label="Next Slide"
                >
                  <IoIosArrowForward />
                </button>
              </div>

              {/* Image rendering */}
              <img
                src={`${data.images[imageCurrentIndex]?.imageSrc}`}
                alt={`${data.images[imageCurrentIndex]?.imageAlt}`}
                className="bannerCarousel_imgBox__image"
                style={{
                  height: `${data.height}`,
                  width: `${data.width}`,
                  objectFit: `${data.objectFit}`,
                  aspectRatio: 4 / 4,
                }}
                loading={idx === 0 ? "eager" : "lazy"} // Load the first image eagerly
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
});

export default BannerCarousel;
