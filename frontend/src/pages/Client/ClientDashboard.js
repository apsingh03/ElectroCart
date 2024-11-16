import React, { useEffect, useState, useContext } from "react";

import { FaAngleRight, FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoAsync } from "../../Redux/UserSlices/UserAuth";
import { AppContext } from "../../context/AppContext";
import { convertInInr } from "../../utils/productDiscountCalculate";
import { formatDate } from "../../utils/convertTime";
// import { Link } from "react-router-dom";

const Header = React.lazy(() => import("../../components/Client/Header"));
const Footer = React.lazy(() => import("../../components/Client/Footer"));

const ClientDashboard = () => {
  const dispatch = useDispatch();
  const { setisLoadingTopProgress } = useContext(AppContext);
  const userDetailsRedux = useSelector(
    (state) => state.client_auth.userDetails
  );

  const [toggleTabs, settoggleTabs] = useState({ orderHistory: true });

  const [toggleHeaderTabs, settoggleHeaderTabs] = useState({ orders: true });

  const handleToggleTabs = (tabName) => {
    settoggleTabs((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const handleToggleHeaderTabs = (tabName) => {
    if (tabName === "orders") {
      settoggleHeaderTabs((prevState) => ({
        ...prevState,
        ["orders"]: true,
      }));
      settoggleHeaderTabs((prevState) => ({
        ...prevState,
        ["addresses"]: false,
      }));
    } else {
      settoggleHeaderTabs((prevState) => ({
        ...prevState,
        ["addresses"]: true,
      }));

      settoggleHeaderTabs((prevState) => ({
        ...prevState,
        ["orders"]: false,
      }));
    }
  };

  async function fetchFilter() {
    setisLoadingTopProgress(30);

    await dispatch(getUserInfoAsync());

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchFilter();
  }, []);

  return (
    <>
      <Header />
      <div className="account">
        <div className="account__header">
          <div
            className={`account__header__card ${
              toggleHeaderTabs["orders"] ? "active" : "notActive"
            } `}
            onClick={() => handleToggleHeaderTabs("orders")}
          >
            <p className="account__header__card__text">Orders</p>
          </div>
          <div
            className={`account__header__card ${
              toggleHeaderTabs["addresses"] ? "active" : "notActive"
            } `}
            onClick={() => handleToggleHeaderTabs("addresses")}
          >
            <p className="account__header__card__text">Addresses</p>
          </div>
        </div>

        <div className="account__body">
          <div>
            {toggleHeaderTabs["orders"] && (
              <>
                <div className="account__body__card">
                  <div
                    className="account__body__card__parent"
                    onClick={() => handleToggleTabs("orderHistory")}
                  >
                    <div className="account__body__card__icon">
                      {" "}
                      <FaAngleRight />{" "}
                    </div>
                    <div className="account__body__card__text">
                      {" "}
                      <p>order history</p>{" "}
                    </div>
                  </div>

                  <div
                    className={`account__body__card__child ${
                      toggleTabs["orderHistory"] ? "active" : "notActive"
                    } `}
                  >
                    {(function () {
                      try {
                        const userCart =
                          (userDetailsRedux.query &&
                            userDetailsRedux.query[0]) ||
                          [];

                        return (
                          <>
                            <div>
                              <h5 className="account__body__card__child__title">
                                Orders
                                <span className="badge badge-secondary bg-dark mx-2">
                                  {userCart?.clientAuthUserCart?.length}
                                </span>
                              </h5>
                            </div>

                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col">Order no</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Payment status</th>
                                    <th scope="col">Delivery status</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">No of Products</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userCart.clientAuthUserCart &&
                                    userCart.clientAuthUserCart.map(
                                      (cart, idx) => {
                                        return (
                                          <tr key={idx}>
                                            <td>{cart?.orderId}</td>
                                            <td>
                                              {formatDate(cart?.createdAt)}
                                            </td>
                                            <td> {cart?.status} </td>
                                            <td> {cart?.deliveryStatus} </td>
                                            <td>
                                              {convertInInr(cart?.cartAmount)}
                                            </td>
                                            <td>
                                              {
                                                cart?.userCartUserCartItem
                                                  ?.length
                                              }
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </>
                        );
                      } catch (error) {
                        console.log("Error - ", error.message);
                      }
                    })()}
                  </div>
                </div>

                <div
                  className="account__body__card"
                  onClick={() => handleToggleTabs("returnExchange")}
                >
                  <div className="account__body__card__parent">
                    <div className="account__body__card__icon">
                      {" "}
                      <FaAngleRight />{" "}
                    </div>
                    <div className="account__body__card__text">
                      {" "}
                      <p>return / exchange</p>{" "}
                    </div>
                  </div>

                  <div
                    className={`account__body__card__child ${
                      toggleTabs["returnExchange"] ? "active" : "notActive"
                    } `}
                  >
                    <p>
                      {" "}
                      Click here to place a return / exchange request. If there
                      are any issues please reach out at care@fablestreet.com{" "}
                    </p>
                  </div>
                </div>

                <div
                  className="account__body__logoutBtn"
                  style={{ cursor: "pointer" }}
                  onClick={() => [
                    localStorage.removeItem("clientLoggedToken"),
                    window.location.replace("/"),
                  ]}
                >
                  <span>logout</span>
                </div>
              </>
            )}
          </div>

          <div>
            {toggleHeaderTabs["addresses"] && (
              <div className="account__body__addresses">
                <h5 className="account__body__card__child__title">
                  Addresses
                  <span className="badge badge-secondary bg-dark mx-2">0</span>
                </h5>

                <div className="account__body__addresses__wrapper">
                  <div className="account__body__addresses__wrapper__allAddresses">
                    <h6>Default Addresses</h6>
                  </div>

                  <div className="account__body__addresses__wrapper__newAddress">
                    <div>
                      {" "}
                      <FaLocationDot />{" "}
                    </div>

                    <div>
                      <h6>Add New Addresses</h6>
                    </div>
                  </div>
                </div>

                <div
                  className="account__body__logoutBtn"
                  style={{ cursor: "pointer" }}
                  onClick={() => [
                    localStorage.removeItem("clientLoggedToken"),
                    window.location.replace("/"),
                  ]}
                >
                  <span>logout</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="account__footer"></div>
      </div>
      <Footer />
      {/* </Suspense> */}
    </>
  );
};

export default ClientDashboard;
