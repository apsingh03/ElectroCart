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

const brands = [
  {
    name: "Apple",
    logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/df15cd27-8f07-4ef3-bbe6-9ff439605ea4.png",
  },
  {
    name: "Samsung",
    logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/5a6154b9-5ede-4bcc-9d70-cff742303cbc.png",
  },
  {
    name: "OnePlus",
    logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/46889902-c66c-435d-a560-53dc99d7e2d2.png",
  },
  {
    name: "Xiaomi",
    logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/a5efad32-ca71-43e0-8f59-e11ef89f9c2f.png",
  },
  {
    name: "Lenovo",
    logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/57491562-4472-4b9e-9e7e-0af7931b4e44.png",
  },
  {
    name: "LG",
    logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/8264660e-8abd-418b-a374-9b4609d75f7c.png",
  },
  //   {
  //     name: "HP",
  //     logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/cf3995f7-995d-42e1-9244-960d600ea72e.png",
  //   },
  {
    name: "Vivo",
    logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/319f6f9b-984d-4531-b14e-14871722a497.png",
  },
  //   {
  //     name: "Dell",
  //     logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/15c21429-5c5d-4b9b-b1a7-adb28a346ba2.png",
  //   },
  //   {
  //     name: "Philips",
  //     logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/72e40f03-b89b-47f6-ab1c-78666a27eb33.png",
  //   },
  {
    name: "Oppo",
    logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/a68cfc8c-9a38-46bd-9bb3-bd0616a3beb8.png",
  },
  {
    name: "Nokia",
    logo: "https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/d1d185a5-9126-4bbf-b720-7005393b1fe4.png",
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
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      backgroundColor: "#ffff",
                    }}
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
