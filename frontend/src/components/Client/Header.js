import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
// import { IoIosSearch } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbScreenShare } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { AppContext } from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { clientGetMenuAsync } from "../../Redux/ClientSlices/clientProductSlice";
import { getUserFavoriteProductAsync } from "../../Redux/UserSlices/FavoriteProduct/FavoriteProductSlice";
import { getUserCartAsync } from "../../Redux/UserSlices/Cart/UserCartRedux";
import DebounceSearch from "./DebounceSearch";
// import SubHeader from "./SubHeader/SubHeader";

const Header = () => {
  const dispatch = useDispatch();

  const clientIsLogged = useSelector((state) => state.client_auth.loggedData);
  const user_userCartLength = useSelector(
    (state) => state.user_userCart?.cartLength
  );

  const user_favoriteProductLength = useSelector(
    (state) => state.user_favoriteProduct.favoriteLength
  );

  const adminIsLogged = useSelector(
    (state) => state.admin_auth.loggedData.isUserLogged
  );

  const client_headerMenuRedux = useSelector(
    (state) => state.client_product.headerMenu
  );

  const {
    isActiveSideBarMenu,
    setisActiveSideBarMenu,
    cartIsHover,
    setcartIsHover,
    setisLoadingTopProgress,
    isActiveDebounceChildContainer,
    setisActiveDebounceChildContainer,
    setisActiveSideBarDebounce,
  } = useContext(AppContext);

  function onClickToggleCart() {
    if (cartIsHover) {
      setcartIsHover(false);
      // document.body.style.overflowY = "auto";
    } else {
      setcartIsHover(true);
      // document.body.style.overflowY = cartIsHover ? "auto" : "hidden";
    }
  }

  async function fetchData() {
    setisLoadingTopProgress(30);

    await dispatch(clientGetMenuAsync());

    if (clientIsLogged.isUserLogged) {
      await dispatch(getUserFavoriteProductAsync());
    }

    if (clientIsLogged.isUserLogged) {
      await dispatch(getUserCartAsync());
    }

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header>
        {/* <div className="promotionContainer">
          <span className="promotionContainer__title">Flat 50% Off</span>
        </div> */}

        <div className="header">
          <div className="header__searchHamburgerIcon">
            <button
              className="header__hamburger  d-xl-none"
              // style={{ cursor: "pointer" }}
              onClick={() => setisActiveSideBarMenu(true)}
              title="Menu"
              aria-label="Menu"
            >
              <span>
                {" "}
                <GiHamburgerMenu />{" "}
              </span>
            </button>

            <button
              className="header__searchIcon "
              // style={{ cursor: "pointer", }}
              onClick={() => setisActiveSideBarDebounce(true)}
              title="Search Icon"
              aria-label="Search Icon"
            >
              <span>
                {" "}
                <IoSearch />{" "}
              </span>
            </button>
          </div>

          <div className="header__1stContainer">
            <Link
              to="/"
              className="header__1stContainer__logo"
              title="ElectroCart"
              aria-label="ElectroCart"
            >
              ElectroCart
            </Link>
          </div>

          {/* <div className="header__2ndContainer ">
            {(function () {
              try {
                return (
                  client_headerMenuRedux.query &&
                  client_headerMenuRedux.query.map((menuData, menuIdx) => {
                    return (
                      <div className="header__2ndContainer__menu" key={menuIdx}>
                        <Link className="header__2ndContainer__menu__title">
                          {" "}
                          {menuData.name && menuData.name}{" "}
                        </Link>
                        <div className="header__2ndContainer__menu__children">
                          {menuData.menuChildData &&
                            menuData.menuChildData.map((subMenu, subIdx) => {
                              return (
                                <Link
                                  key={subIdx}
                                  className="header__2ndContainer__menu__children__title"
                                >
                                  {subMenu.name && subMenu.name}
                                </Link>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })
                );
              } catch (error) {
                console.log("Error Header - ", error.message);
              }
            })()}
          </div> */}

          <div className="header__3rdContainer">
            <DebounceSearch />
          </div>

          <div className="header__4thContainer">
            {adminIsLogged ? (
              <Link
                className="header__4thContainer__userIcon"
                title="Admin Panel"
                to="/admin/"
                aria-label="Admin Login"
              >
                <TbScreenShare />
              </Link>
            ) : (
              <Link
                className="header__4thContainer__userIcon"
                title="Admin Auth"
                to="/admin/auth"
                aria-label="Admin Auth"
              >
                <MdOutlineAdminPanelSettings />
              </Link>
            )}

            {clientIsLogged.isUserLogged ? (
              <Link
                className="header__4thContainer__userIcon"
                title="Wish List"
                to="/wishlist"
                style={{ position: "relative" }}
                aria-label="Wish List"
              >
                <FaRegHeart />
                {clientIsLogged.isUserLogged ? (
                  <span
                    title="Qty"
                    aria-label="Qty"
                    className="header__4thContainer__cartIcon__badge"
                  >
                    {user_favoriteProductLength}
                  </span>
                ) : null}
              </Link>
            ) : (
              <Link
                className="header__4thContainer__userIcon"
                to="/signin"
                aria-label="Sign In"
                title="Sign In"
              >
                <FaRegHeart />
              </Link>
            )}

            {clientIsLogged?.isUserLogged ? (
              <Link
                className="header__4thContainer__userIcon"
                to="/account"
                title={clientIsLogged?.email}
                aria-label="Account"
              >
                <FaRegUser />
              </Link>
            ) : (
              <Link
                className="header__4thContainer__userIcon"
                title="Sign In"
                to="/signin"
                aria-label="Sign In"
              >
                <FaRegUser />
              </Link>
            )}

            <button
              className="header__4thContainer__cartIcon"
              title="Cart"
              onClick={() => onClickToggleCart()}
              style={{ position: "relative" }}
              aria-label="Cart"
            >
              <LiaShoppingBagSolid />
              {clientIsLogged.isUserLogged ? (
                <span
                  aria-label="Qty"
                  title="Qty"
                  className="header__4thContainer__cartIcon__badge"
                >
                  {user_userCartLength}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {/* <SubHeader
        menuData={client_headerMenuRedux.query && client_headerMenuRedux.query}
      /> */}

      {/* <div className="p-1 bg-dark text-center ">
        <Link
          className="text-decoration-none fs-6 text-white"
          to="/projectCaseStudy"
        >
          {" "}
          Click Here for Project Case Study | WearKart Android APP
        </Link>
      </div> */}
    </>
  );
};

export default Header;
