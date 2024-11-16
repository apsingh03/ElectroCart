import React from "react";
import { Link } from "react-router-dom";
// import AllAccessoriesSvgIcon from "../../../utils/SvgIcons/allAccessories";
// import MobileSvgIcon from "../../../utils/SvgIcons/mobile";
// import TvSvgIcon from "../../../utils/SvgIcons/Tv";
// import LaptopSvgIcon from "../../../utils/SvgIcons/laptop";
// import TabletSvgIcon from "../../../utils/SvgIcons/tablet";
import { FaLaptop } from "react-icons/fa";
import { TbDeviceMobileFilled } from "react-icons/tb";
import {
  HiOutlineDevicePhoneMobile,
  HiDeviceTablet,
  HiOutlineTv,
} from "react-icons/hi2";
// "images/brand/apple.png"
const brands = [
  {
    name: "Apple",

    logo: "images/brand/apple.png",
  },
  {
    name: "Samsung",
    logo: "images/brand/samsung.png",
  },

  {
    name: "Xiaomi",
    logo: "images/brand/readme.png",
  },
  {
    name: "Lenovo",
    logo: "images/brand/lenovo.png",
  },
  {
    name: "LG",
    logo: "images/brand/lg.png",
  },

  {
    name: "Vivo",
    logo: "images/brand/vivo.png",
  },

  {
    name: "Dell",
    logo: "images/brand/dell.png",
  },
  {
    name: "Nokia",
    logo: "images/brand/nokia.png",
  },
  {
    name: "Philips",
    logo: "images/brand/philips.png",
  },
];

const categories = [
  {
    name: "Mobiles",
    iconName: <HiOutlineDevicePhoneMobile size={30} color="#29282b" />,
  },
  {
    name: "All accessories",
    iconName: <TbDeviceMobileFilled size={30} color="#29282b" />,
  },
  { name: "Tablets", iconName: <HiDeviceTablet size={30} color="#29282b" /> },
  { name: "Tv's", iconName: <HiOutlineTv size={30} color="#29282b" /> },
  { name: "Laptops", iconName: <FaLaptop size={30} color="#29282b" /> },
];

const BrandCategorySearch = () => {
  return (
    <div
      className=""
      style={{ backgroundColor: "#F9F9F9", padding: "50px 20px" }}
    >
      <div className="row ">
        {" "}
        {/* Added gap between sections */}
        {/* Brands Section */}
        <div className="col-12 col-md-7 mb-4" style={{}}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px", // Rounded corners
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Lato",
              }}
            >
              Search by Brands
            </h2>
            <div
              className="d-flex flex-wrap justify-content-between"
              style={{ gap: "15px", marginTop: "10px" }}
            >
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-center "
                  style={{
                    width: "20%",
                    height: "70px",
                    // backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      backgroundColor: "#ffff",
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Categories Section */}
        <div className="col-12 col-md-5">
          <div
            style={{
              backgroundColor: "#fff", // White background for the card effect
              padding: "20px",
              borderRadius: "10px", // Rounded corners
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for the floating effect
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Lato",
              }}
            >
              Search by Categories
            </h2>
            <div
              className="d-flex flex-wrap "
              style={{ gap: "10px", marginTop: "10px" }}
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{
                    width: "48%",
                    height: "63px",
                    backgroundColor: "#F9F9F9",
                    borderRadius: "8px",
                    textAlign: "center",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>
                    {/* {category.icon}   */}
                    {category.iconName}
                  </span>
                  <p
                    className="mb-0"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      fontFamily: "Lato",
                    }}
                  >
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCategorySearch;
