import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import { clientGetMenuAsync } from "../../Redux/ClientSlices/clientProductSlice";

const SideBarMenu = ({ setisActiveSideBarMenu }) => {
  const dispatch = useDispatch();

  const [isSubMenuToggle, setisSubMenuToggle] = useState({});

  const client_headerMenuRedux = useSelector(
    (state) => state.client_product.headerMenu
  );
  // console.log("admin_parentMenuRedux - ", admin_parentMenuRedux);

  const { setisLoadingTopProgress } = useContext(AppContext);

  const handleToggle = (id) => {
    setisSubMenuToggle((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  async function fetchData() {
    setisLoadingTopProgress(30);

    await dispatch(clientGetMenuAsync());

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="sideMenu">
      <div className="sideMenu__header">
        <div
          onClick={() => setisActiveSideBarMenu((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <RxCross2 />
        </div>
      </div>
      <div className="sideMenu__body">
        {(function () {
          try {
            return (
              client_headerMenuRedux.query &&
              client_headerMenuRedux.query.map((menuData, menuIdx) => {
                return (
                  <div
                    className="sideMenu__body__card"
                    key={menuIdx}
                    onClick={() => handleToggle(menuData.id)}
                  >
                    <div className="sideMenu__body__card__parent ">
                      <div>
                        <Link
                          className="sideMenu__body__card__parent__catName text-decoration-none"
                          to={menuData?.routeLink}
                          target="_blank"
                        >
                          {menuData.name && menuData.name}
                        </Link>
                      </div>

                      <div>
                        <span>
                          {isSubMenuToggle[menuData.id] ? (
                            <FaMinus />
                          ) : (
                            <FaPlus />
                          )}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`sideMenu__body__child  ${
                        isSubMenuToggle[menuData.id]
                          ? "subMenuActive"
                          : "subMenuNotActive"
                      } `}
                    >
                      {menuData.menuChildData &&
                        menuData.menuChildData.map((subMenu, subMenuIdx) => {
                          return (
                            <div
                              key={subMenuIdx}
                              className="sideMenu__body__child__card"
                            >
                              <Link target="_blank" to={subMenu?.routeLink}>
                                {subMenu.name && subMenu.name}
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })
            );
          } catch (error) {
            console.log("Error SideBarMenu - ", error.message);
          }
        })()}
      </div>

      <div className="sideMenu__footer">
        <div className="sideMenu__footer__card">
          <span>
            {" "}
            <FaExchangeAlt />{" "}
          </span>
          <p>return / exchange</p>
        </div>

        <div className="sideMenu__footer__card">
          <span>
            {" "}
            <FaRegUser />{" "}
          </span>
          <p>Account</p>
        </div>
      </div>
    </div>
  );
};

export default SideBarMenu;
