import React, { useState, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "../../styles/Admin/Admin.css";
import { FaRegUserCircle } from "react-icons/fa";
// import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { FaSolarPanel } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector } from "react-redux";
// components
import VenDashboard from "../../components/Admin/VenDashboard";
import AddProduct from "../../components/Admin/Product/AddProduct";
import AllProducts from "../../components/Admin/Product/AllProducts";
import ParentFilter from "../../components/Admin/Filter/ParentFilter";
import ChildFilter from "../../components/Admin/Filter/ChildFilter";
import ParentMenu from "../../components/Admin/Menu/ParentMenu";
import ChildMenu from "../../components/Admin/Menu/ChildMenu";
import Sizes from "../../components/Admin/Sizes/Sizes";
import Category from "../../components/Admin/Category/Category";
import Color from "../../components/Admin/Color/Color";
import Fabric from "../../components/Admin/Fabric/Fabric";
import RecycleBin from "../../components/Admin/Product/RecycleBin";
import AllPlacedOrders from "../../components/Admin/Orders/AllPlacedOrders";
import ParentBannerCarousel from "../../components/Admin/BannerCarousel/ParentBannerCarousel";
import ChildBannerCarousel from "../../components/Admin/BannerCarousel/ChildBannerCarousel";
import ChildActressCarousel from "../../components/Admin/ActressCarousel/ChildActressCarousel";
import ParentActressCarousel from "../../components/Admin/ActressCarousel/ParentActressCarousel";
import ParentTestimonial from "../../components/Admin/Testimonial/ParentTestimonial";
import ChildTestimonial from "../../components/Admin/Testimonial/ChildTestimonial";
import FourImagesBanner from "../../components/Admin/FourImagesBanner/FourImagesBanner";
import ParentCategoryBrand from "../../components/Admin/CategoryBrand/ParentCategoryBrand";
import ChildCategoryBrand from "../../components/Admin/CategoryBrand/ChildCategoryBrand";

const AdminJunction = () => {
  const adminAuth = useSelector((state) => state.admin_auth.loggedData);

  const [sideNavIconToggle, setSideNavIconToggle] = useState({});
  const [isOpenHamBurger, setisOpenHamBurger] = useState(false);
  const [hamBurgerMenuToggle, sethamBurgerMenuToggle] = useState(true);

  const navigation = useNavigate();

  const refs = useRef({});

  // console.log("refs - ", refs);

  const handleToggle = (id) => {
    setSideNavIconToggle((prevToggles) => ({
      ...prevToggles,
      [id]: !prevToggles[id],
    }));

    if (refs.current[id]) {
      refs.current[id].classList.toggle("active");
      // refs.current[`${id}_icon`].classList.toggle("rotated");
    }
  };

  const sideNav = [
    {
      id: 1,
      category: "Product Filters",
      title: "Filters",
      subMenu: [
        { name: "Create Parent", url: "parentFilter" },
        { name: "Create Child", url: "childFilter" },
      ],
    },
    {
      id: 2,
      category: "Product Menu",
      title: "Menu ",
      subMenu: [
        { name: "Create Parent", url: "parentMenu" },
        { name: "Create Child", url: "childMenu" },
      ],
    },

    {
      id: 3,
      category: "Category Brand",
      title: "Product Category Brand",
      subMenu: [
        { name: "Create Category Parent", url: "parentCategoryBrand" },
        { name: "Create Brand Child", url: "childCategoryBrand" },
      ],
    },
    {
      id: 4,
      category: "Product other Details",
      title: "Product Info",
      subMenu: [
        { name: "Listed Products", url: "listedProducts" },
        { name: "Category", url: "category" },
        { name: "Color", url: "color" },
        { name: "Fabrics", url: "fabrics" },
        { name: "Create Product", url: "addProduct" },
        { name: "Recycle Bin", url: "recycleBinProduct" },
      ],
    },
    {
      id: 5,
      category: "Orders Info",
      title: "Orders",
      subMenu: [{ name: "Placed Orders", url: "placedOrders" }],
    },
    {
      id: 6,
      category: "Frontend ",
      title: "Carousels Elements",
      subMenu: [
        {
          name: "Parent Banner Carousel",
          url: "bannerCarousel/parent/parentBannerCarousel",
        },
        {
          name: "Child Banner Carousel",
          url: "bannerCarousel/child/childBannerCarousel",
        },
        {
          name: "Parent Actress Carousel",
          url: "actressCarousel/parent/parentActressCarousel",
        },
        {
          name: "Child Actress Carousel",
          url: "actressCarousel/child/childActressCarousel",
        },
        {
          name: "Parent Testimonial Carousel",
          url: "testimonial/parent/parentTestimonial",
        },
        {
          name: "Child Testimonial Carousel",
          url: "testimonial/child/childTestimonial",
        },
        {
          name: "Four Images Banner",
          url: "fourImagesBanner",
        },
      ],
    },
  ];

  return (
    <>
      <div className="admin">
        <header className="admin__header">
          <div className="admin__header__1st">
            <h6 className="admin__header__1st__brandName">
              {" "}
              <Link to="/admin/">Admin Panel</Link>
            </h6>

            <div
              className="admin__header__hamburgerIcon"
              onClick={() => sethamBurgerMenuToggle(!hamBurgerMenuToggle)}
            >
              <Hamburger
                toggled={isOpenHamBurger}
                toggle={setisOpenHamBurger}
              />
            </div>
          </div>

          <div className="admin__header__menu__container">
            <div className="admin__header__menu">
              <Link className="admin__header__menu__title">
                {" "}
                <IoNotifications />
              </Link>
              <div className="admin__header__menu__children">
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 1{" "}
                </Link>
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 2{" "}
                </Link>
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 3{" "}
                </Link>
              </div>
            </div>
            <div className="admin__header__menu">
              <Link className="admin__header__menu__title">
                {" "}
                <FaRegUserCircle /> {adminAuth.email && adminAuth.email}
              </Link>
              <div className="admin__header__menu__children">
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 1{" "}
                </Link>
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 2{" "}
                </Link>
                <Link
                  className="admin__header__menu__children__title"
                  onClick={() => [
                    localStorage.removeItem("adminLoggedToken"),
                    window.location.replace("/"),
                  ]}
                >
                  {" "}
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="admin__belowSide">
          <div
            className={`admin__belowSide__leftSide  ${
              hamBurgerMenuToggle ? "hideIt" : "showIt"
            } `}
          >
            <div className="admin__belowSide__leftSide__wrapper">
              {/* CARD */}

              {sideNav.map((data, index) => {
                // console.log(data);
                return (
                  <div
                    className="admin__belowSide__leftSide__wrapper__card"
                    key={index}
                  >
                    <h6 className="admin__belowSide__leftSide__wrapper__card__title">
                      {data.category}{" "}
                    </h6>

                    <div
                      className="admin__belowSide__leftSide__wrapper__card__nav"
                      onClick={() => handleToggle(data.id)}
                    >
                      <div className="admin__belowSide__leftSide__wrapper__card__nav__1st">
                        <span>
                          <FaSolarPanel />
                        </span>
                        <p className="admin__belowSide__leftSide__wrapper__card__nav_title">
                          {data.title}
                        </p>
                      </div>
                      <div
                        className="admin__belowSide__leftSide__wrapper__card__nav__2nd"
                        // ref={(el) => (refs.current[`${data.id}_icon`] = el)}
                        // ref={(el) => {
                        //   if (sideNavIconToggle[data.id]) {
                        //     refs.current[`${data.id}_icon`] = el;
                        //   }
                        // }}
                      >
                        {sideNavIconToggle[data.id] ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </div>
                    </div>

                    <div
                      className={`admin__belowSide__leftSide__wrapper__card__child`}
                      ref={(el) => (refs.current[data.id] = el)}
                    >
                      {data.subMenu.map((subMenu, subIdx) => {
                        // console.log("subMenu - ", subMenu);
                        return (
                          <div key={subIdx}>
                            <Link to={`${subMenu.url ? subMenu.url : "#"}/`}>
                              {" "}
                              {subMenu.name}{" "}
                            </Link>{" "}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="admin__belowSide__rightSide">
            <Routes>
              <Route path="/" element={<VenDashboard />} />

              {/* Filter */}
              <Route path="/parentFilter" element={<ParentFilter />} />
              <Route path="/childFilter" element={<ChildFilter />} />

              {/* Menu */}
              <Route path="/parentMenu" element={<ParentMenu />} />
              <Route path="/childMenu" element={<ChildMenu />} />

              {/* CategoryParent */}
              <Route
                path="/parentCategoryBrand"
                element={<ParentCategoryBrand />}
              />
              <Route
                path="/childCategoryBrand"
                element={<ChildCategoryBrand />}
              />

              {/* Size */}
              <Route path="/sizes" element={<Sizes />} />

              {/* Products  */}
              <Route path="/category" element={<Category />} />
              <Route path="/color" element={<Color />} />
              <Route path="/fabrics" element={<Fabric />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/listedProducts" element={<AllProducts />} />
              <Route path="/recycleBinProduct" element={<RecycleBin />} />

              {/* Orders */}
              <Route path="/placedOrders" element={<AllPlacedOrders />} />

              {/* Front End UI */}
              <Route
                path="bannerCarousel/parent/parentBannerCarousel"
                element={<ParentBannerCarousel />}
              />
              <Route
                path="bannerCarousel/child/childBannerCarousel"
                element={<ChildBannerCarousel />}
              />
              <Route
                path="actressCarousel/parent/parentActressCarousel"
                element={<ParentActressCarousel />}
              />
              <Route
                path="actressCarousel/child/childActressCarousel"
                element={<ChildActressCarousel />}
              />
              <Route
                path="testimonial/parent/parentTestimonial"
                element={<ParentTestimonial />}
              />
              <Route
                path="testimonial/child/childTestimonial"
                element={<ChildTestimonial />}
              />

              <Route path="fourImagesBanner" element={<FourImagesBanner />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminJunction;
