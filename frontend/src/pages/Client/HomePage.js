import React, { useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { FaLocationDot } from "react-icons/fa6";

// import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import {
  // clientGetActressCarouselAsync,
  clientGetBannerCarouselAsync,
  // clientGetCategoryWiseProductAsync,
  // clientGetFourBannerImagesAsync,
  clientGetMenuAsync,
  // clientGetTestimonialAsync,
  clientShowFilteredProductsAsync,
} from "../../Redux/ClientSlices/clientProductSlice";
import DealsSection from "../../components/Client/DealsSection";
import CategorySection from "../../components/Client/HomePage/CategorySection";
import BrandCategorySearch from "../../components/Client/HomePage/BrandCategorySearch";
import FooterServiceOffering from "../../components/Client/FooterServiceOffering";
import WhatsAppBtn from "../../components/WhatsAppBtn/WhatsAppBtn";
import SubHeader from "../../components/Client/SubHeader/SubHeader";

const Header = React.lazy(() => import("../../components/Client/Header"));
const Footer = React.lazy(() => import("../../components/Client/Footer"));

// const Testimonial = React.lazy(() =>
//   import("../../components/Client/Testimonial")
// );
// const DressesCarouselAtLg = React.lazy(() =>
// import("../../components/Client/HomePage/DressesCarouselAtLg")
// );
// const ProductsCarousel = React.lazy(() =>
//   import("../../components/Client/HomePage/ProductsCarousel")
// );
const BannerCarousel = React.lazy(() =>
  import("../../components/Client/BannerCarousel")
);
// const ActressCarousel = React.lazy(() =>
//   import("../../components/Client/ActressCarousel")
// );

// import Testimonial from "../../components/Client/Testimonial";
// import DressesCarouselAtLg from "../../components/Client/HomePage/DressesCarouselAtLg";
// import ProductsCarousel from "../../components/Client/HomePage/ProductsCarousel";
// import BannerCarousel from "../../components/Client/BannerCarousel";
// import ActressCarousel from "../../components/Client/ActressCarousel";

const HomePage = () => {
  const dispatch = useDispatch();
  const { setisLoadingTopProgress } = useContext(AppContext);
  const categoryWiseProductsRedux = useSelector(
    (state) => state.client_product?.categoryWiseProducts?.query
  );
  const bannerCarouselRedux = useSelector(
    (state) => state.client_product?.bannerCarousel?.query
  );
  const actressCarouselRedux = useSelector(
    (state) => state.client_product?.actressCarousel?.query
  );
  const fourBannerImagesRedux = useSelector(
    (state) => state.client_product?.fourBannerImages?.query
  );
  const testimonialRedux = useSelector(
    (state) => state.client_product?.testimonial?.query
  );

  const client_headerMenuRedux = useSelector(
    (state) => state.client_product.headerMenu
  );

  const client_allProductsRedux = useSelector(
    (state) => state.client_product.allProducts
  );

  const client_allProductsRedux__mobiles =
    client_allProductsRedux?.query &&
    client_allProductsRedux?.query.filter(
      (data) =>
        data?.productCategory?.name === "Mobile" && data?.isFavorite === true
    );

  const client_allProductsRedux__tablet =
    client_allProductsRedux?.query &&
    client_allProductsRedux?.query.filter(
      (data) =>
        data?.productCategory?.name === "Tablet" && data?.isFavorite === true
    );

  const client_allProductsRedux__tvs =
    client_allProductsRedux?.query &&
    client_allProductsRedux?.query.filter(
      (data) =>
        data?.productCategory?.name === "Tv's" && data?.isFavorite === true
    );

  const client_allProductsReduxQuery =
    client_allProductsRedux?.query && client_allProductsRedux?.query;

  const isLoadingClient_allProductsRedux =
    !client_allProductsReduxQuery || !client_allProductsReduxQuery;

  // console.log("client_allProductsRedux - ", client_allProductsRedux);

  // console.log("actressCarouselRedux - ", actressCarouselRedux);

  // console.log("fourBannerImagesRedux - ", fourBannerImagesRedux);

  // console.log("testimonialRedux - ", testimonialRedux);

  async function fetchData() {
    setisLoadingTopProgress(30);
    await dispatch(clientGetMenuAsync());
    await dispatch(clientGetBannerCarouselAsync());
    // await dispatch(clientGetActressCarouselAsync());
    // await dispatch(clientGetFourBannerImagesAsync());
    // await dispatch(clientGetCategoryWiseProductAsync());
    // await dispatch(clientGetTestimonialAsync());

    await dispatch(
      clientShowFilteredProductsAsync({
        category: [],
        brand: [],
        color: [],
        size: [],
        price: {
          gte: null,
          lte: null,
        },
      })
    );

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (function () {
    try {
      return (
        <>
          <Header />

          <SubHeader
            menuData={
              client_headerMenuRedux?.query && client_headerMenuRedux?.query
            }
          />

          <section className="dressesCarouselAtlg ">
            {/* <DressesCarouselAtLg
              actressCarouselRedux={
                actressCarouselRedux && actressCarouselRedux
              }
            /> */}
          </section>
          {/* sm, md, lg, */}
          <section
            className=" p-sm-2 p-md-3 p-lg-3 p-xl-3"
            style={{
              backgroundColor: "#F3F6F9",
              // height: "300px ",
            }}
          >
            <BannerCarousel
              bannerCarouselRedux={bannerCarouselRedux && bannerCarouselRedux}
            />
          </section>
          <DealsSection />
          <div>
            <CategorySection
              title="Latest Mobiles"
              products={client_allProductsRedux__mobiles}
              categoryRelatedImage="/images/mobileBanner.jpg"
              categoryRelatedImageWidth="100%"
              categoryRelatedImageheight="auto"
              categoryRelatedImageObjectFit="cover"
              categoryRelatedImageAlt="Tablet Banner"
            />

            <CategorySection
              title="Latest Tablet"
              products={client_allProductsRedux__tablet}
              parentBgColor="#fff"
              categoryRelatedImage="https://cdn.mos.cms.futurecdn.net/qyURdgtrL98nNyim2u8D3A-1200-80.jpeg"
              categoryRelatedImageWidth="100%"
              categoryRelatedImageheight="500px"
              categoryRelatedImageObjectFit="cover"
              categoryRelatedImageAlt="Tablet Banner"
            />
          </div>
          <div>
            <BrandCategorySearch />
          </div>
          <FooterServiceOffering />
          <Footer />
          <WhatsAppBtn />
        </>
      );
    } catch (error) {
      console.log("Error - ", error.message);
    }
  })();
};

export default HomePage;
