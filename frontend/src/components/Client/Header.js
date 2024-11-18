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
              {/* <img
                src="electrocart.png"
                width={"100%"}
                height={"50px"}
                alt="Brand Icon"
                title="Brand  Icon"
              /> */}

              {/* ElectroCart */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="50"
                fill="none"
                viewBox="0 0 539 202"
              >
                <path fill="#9E2D2C" d="M0 0h539v202H0z"></path>
                <path
                  fill="#fff"
                  d="M46.474 134V75.818h40.568v11.42H60.536v11.933h24.432v11.448H60.536v11.961h26.506V134zm63.267-58.182V134H95.849V75.818zm29.24 59.006q-6.847 0-11.818-2.699-4.944-2.727-7.614-7.756-2.642-5.057-2.642-12.017 0-6.761 2.67-11.818 2.671-5.085 7.529-7.898 4.858-2.84 11.449-2.84 4.66 0 8.522 1.448 3.864 1.449 6.677 4.29t4.375 7.017q1.562 4.148 1.562 9.517v3.466h-37.926v-8.068h25q-.028-2.216-1.051-3.949a7.15 7.15 0 0 0-2.813-2.699q-1.761-.994-4.062-.994-2.33 0-4.176 1.051a7.7 7.7 0 0 0-2.926 2.813q-1.08 1.761-1.137 4.005v8.21q0 2.671 1.051 4.688a7.6 7.6 0 0 0 2.983 3.097q1.932 1.107 4.603 1.107 1.846 0 3.352-.511t2.585-1.506a6.2 6.2 0 0 0 1.619-2.443l12.756.37q-.795 4.289-3.494 7.471-2.672 3.154-7.017 4.915-4.347 1.733-10.057 1.733m48.175 0q-6.904 0-11.847-2.841-4.915-2.841-7.557-7.898-2.642-5.085-2.642-11.761 0-6.704 2.642-11.762 2.67-5.085 7.585-7.926 4.944-2.84 11.79-2.84 6.05 0 10.54 2.187 4.517 2.188 7.045 6.193 2.558 3.977 2.699 9.347h-12.983q-.397-3.352-2.272-5.256-1.847-1.903-4.83-1.903-2.415 0-4.233 1.363-1.818 1.335-2.841 3.978-.994 2.613-.994 6.477t.994 6.534q1.023 2.641 2.841 4.006 1.818 1.335 4.233 1.335 1.932 0 3.409-.824 1.506-.823 2.472-2.415.966-1.619 1.221-3.92h12.983q-.198 5.397-2.699 9.432-2.47 4.034-6.96 6.278-4.46 2.216-10.596 2.216m51.995-44.46v10.227h-27.528V90.364zM217.39 79.909h13.892v40.369q0 1.28.398 2.074.426.768 1.221 1.108.796.313 1.904.313.795 0 1.676-.142.909-.171 1.363-.284l2.103 10.028q-.995.284-2.813.71-1.79.426-4.29.54-4.886.228-8.38-1.136-3.467-1.392-5.313-4.319-1.818-2.925-1.761-7.358zM246.239 134V90.364h13.495v7.954h.454q1.194-4.319 3.892-6.42 2.699-2.13 6.279-2.131.966 0 1.988.142 1.023.114 1.904.37v12.073q-.994-.34-2.614-.54a23 23 0 0 0-2.841-.198q-2.472 0-4.46 1.108a7.96 7.96 0 0 0-3.097 3.039q-1.108 1.932-1.108 4.546V134zm51.776.824q-6.875 0-11.818-2.813-4.915-2.84-7.585-7.897-2.643-5.086-2.643-11.79 0-6.733 2.643-11.79 2.67-5.085 7.585-7.898 4.943-2.84 11.818-2.84t11.79 2.84q4.943 2.813 7.585 7.898 2.67 5.057 2.67 11.79 0 6.704-2.67 11.79-2.642 5.056-7.585 7.897-4.916 2.813-11.79 2.813m.085-10.483q2.5 0 4.233-1.534t2.642-4.262q.938-2.727.938-6.306 0-3.637-.938-6.364-.91-2.727-2.642-4.261-1.733-1.534-4.233-1.534-2.585 0-4.375 1.534-1.761 1.534-2.699 4.261-.909 2.727-.909 6.364 0 3.579.909 6.306.938 2.728 2.699 4.262 1.79 1.534 4.375 1.534m81.889-27.443h-14.204q-.285-2.188-1.165-3.95a9.6 9.6 0 0 0-2.33-3.01q-1.448-1.25-3.437-1.904-1.96-.682-4.347-.682-4.232 0-7.301 2.074-3.04 2.073-4.687 5.995-1.62 3.92-1.62 9.488 0 5.796 1.648 9.716 1.676 3.892 4.688 5.881 3.04 1.96 7.187 1.96 2.33 0 4.233-.597 1.932-.596 3.381-1.733a9.6 9.6 0 0 0 2.415-2.812q.966-1.677 1.335-3.779l14.204.086q-.369 3.863-2.244 7.613-1.846 3.75-5.085 6.847-3.239 3.068-7.898 4.886-4.63 1.818-10.625 1.818-7.897 0-14.148-3.465-6.221-3.495-9.829-10.171t-3.608-16.25q0-9.602 3.665-16.278 3.665-6.677 9.914-10.142 6.25-3.466 14.006-3.466 5.284 0 9.773 1.477 4.488 1.449 7.898 4.261 3.409 2.784 5.539 6.847 2.131 4.062 2.642 9.29m20.348 37.841q-4.176 0-7.414-1.392-3.211-1.42-5.086-4.262-1.846-2.869-1.846-7.187 0-3.637 1.278-6.137t3.523-4.062q2.245-1.563 5.17-2.358 2.926-.824 6.25-1.108 3.722-.34 5.995-.71 2.272-.398 3.295-1.108 1.051-.74 1.051-2.074v-.142q0-2.187-1.505-3.381-1.506-1.193-4.063-1.193-2.755 0-4.432 1.193-1.676 1.194-2.13 3.296l-12.813-.455q.568-3.977 2.926-7.102 2.387-3.154 6.534-4.943 4.176-1.82 10.029-1.819 4.176 0 7.699.995 3.523.966 6.136 2.84 2.613 1.848 4.034 4.546 1.449 2.7 1.449 6.165V134h-13.068v-6.08h-.341q-1.165 2.217-2.983 3.75-1.79 1.534-4.233 2.302-2.415.767-5.455.767m4.29-9.091q2.244 0 4.034-.909 1.818-.91 2.898-2.5 1.08-1.62 1.079-3.75v-4.148q-.596.313-1.448.568-.825.257-1.819.483-.993.228-2.045.398-1.051.17-2.017.312-1.96.314-3.352.966-1.364.654-2.103 1.705-.71 1.023-.71 2.443 0 2.159 1.534 3.295 1.563 1.137 3.949 1.137M434.911 134V90.364h13.495v7.954h.454q1.194-4.319 3.892-6.42 2.699-2.13 6.279-2.131.965 0 1.988.142 1.022.114 1.904.37v12.073q-.995-.34-2.614-.54a23 23 0 0 0-2.841-.198q-2.472 0-4.46 1.108a7.96 7.96 0 0 0-3.097 3.039q-1.108 1.932-1.108 4.546V134zm60.334-43.636v10.227h-27.528V90.364zm-21.761-10.455h13.892v40.369q0 1.28.397 2.074.427.768 1.222 1.108.795.313 1.903.313.796 0 1.677-.142.909-.171 1.363-.284l2.102 10.028q-.994.284-2.812.71-1.79.426-4.29.54-4.886.228-8.38-1.136-3.466-1.392-5.313-4.319-1.818-2.925-1.761-7.358z"
                ></path>
              </svg>
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
            <div>
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
            </div>
            <div>
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
            </div>

            <div>
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
            </div>

            <div>
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
