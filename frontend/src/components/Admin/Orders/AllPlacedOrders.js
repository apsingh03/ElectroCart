import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
// import { MdFavorite } from "react-icons/md";
// import {
//   MdFavoriteBorder,
//   MdPublishedWithChanges,
//   MdUnpublished,
// } from "react-icons/md";
// import { FaCheckCircle } from "react-icons/fa";
// import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { useSelector, useDispatch } from "react-redux";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  calculateProductDiscount,
  convertInInr,
} from "../../../utils/productDiscountCalculate";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/convertTime";
import {
  getOrdersAsync,
  updateDeliveryStatusAsync,
} from "../../../Redux/AdminSlices/Orders/OrderSlice";
import { useSocket } from "../../../context/SocketContext";

const AllPlacedOrders = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();

  const { setisLoadingTopProgress } = useContext(AppContext);
  const [isToggleProductMoreDetail, setisToggleProductMoreDetail] = useState(
    {}
  );

  const [isUpdateDeliveryStatus, setisUpdateDeliveryStatus] = useState({});

  // const admin_productRedux = useSelector((state) => state.admin_product.data);

  // const admin_ordersRedux = useSelector((state) => state.admin_orders.data);

  const [updateDeliveryCartId, setupdateDeliveryCartId] = useState();

  const [allPlacedOrders, setallPlacedOrders] = useState([]);

  // console.log("isUpdateDeliveryStatus - ", isUpdateDeliveryStatus);
  function handleisUpdateDeliveryStatus(id) {
    setisUpdateDeliveryStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  async function fetchData() {
    setisLoadingTopProgress(30);

    const action = await dispatch(getOrdersAsync());
    if (action.payload?.msg && action.payload?.msg === "success") {
      setallPlacedOrders(action.payload.query);
    }
    setisLoadingTopProgress(100);
  }

  function handleProductMoreDetailToggle(id) {
    setisToggleProductMoreDetail((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  async function handleUpdateDelivery(e) {
    if (window.confirm("Do You want to update Delivery ")) {
      setisLoadingTopProgress(30);
      e.preventDefault();

      if (e.target.deliveryText.value.length > 0) {
        const actionResult = await dispatch(
          updateDeliveryStatusAsync({
            deliveryStatus: e.target.deliveryText.value,
            cartId: updateDeliveryCartId,
          })
        );
        if (
          actionResult.payload?.msg &&
          actionResult.payload?.msg === "success"
        ) {
          toast.success("Delivery Updated");
          setisUpdateDeliveryStatus(false);
        }
      }

      setisLoadingTopProgress(100);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // SOCKET
  useEffect(() => {
    if (!socket) return;

    // Listen for new message events from the server
    socket.on("newOrder", (socketAction) => {
      // console.log("socketAction ", socketAction);
      setallPlacedOrders((prevOrders) => [socketAction, ...prevOrders]);
    });

    // Clean up function to remove event listener
    return () => {
      socket.off("newOrder");
    };
  }, [socket]);

  return (
    <>
      <h4 className="text-center mb-3">All Placed Orders</h4>
      <div id="adminRightSideWrapper">
        <div className="listedProducts">
          <div className="table-responsive">
            {(function () {
              try {
                if (allPlacedOrders && allPlacedOrders.length > 0) {
                  return (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">
                            S.No
                          </th>
                          <th scope="col"> User Details </th>

                          <th scope="col" className="text-center">
                            Amount
                          </th>
                          <th scope="col" className="text-center">
                            Order Id
                          </th>
                          <th scope="col" className="text-center">
                            Payment Id
                          </th>
                          <th scope="col" className="text-center">
                            Status
                          </th>
                          <th scope="col" className="text-center">
                            Delivery Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {(function () {
                          try {
                            return (
                              allPlacedOrders &&
                              allPlacedOrders.map((order, index) => {
                                const clientAuthUserCart =
                                  order?.clientAuthUserCart;

                                const userCartUserCartItem =
                                  order?.userCartUserCartItem;

                                return (
                                  <React.Fragment key={index}>
                                    <tr>
                                      <td className="text-center">
                                        {index + 1}
                                      </td>
                                      <td className="listedProducts__2nd">
                                        <p>
                                          {clientAuthUserCart?.fullName} <br />
                                          {clientAuthUserCart?.email}
                                        </p>

                                        <div className="listedProducts__2nd__toggle">
                                          <h6
                                            className="listedProducts__2nd__toggle__title"
                                            onClick={() =>
                                              handleProductMoreDetailToggle(
                                                order.id
                                              )
                                            }
                                          >
                                            Product Details
                                            <span
                                              style={{ marginLeft: "10px" }}
                                            >
                                              {isToggleProductMoreDetail[
                                                order.id
                                              ] ? (
                                                <IoIosArrowUp
                                                  size={20}
                                                  color="#000"
                                                />
                                              ) : (
                                                <IoIosArrowDown
                                                  size={20}
                                                  color="#000"
                                                />
                                              )}
                                            </span>
                                          </h6>
                                        </div>
                                      </td>
                                      <td className="text-center">
                                        {convertInInr(order?.cartAmount)}
                                      </td>
                                      <td className="text-center">
                                        {order?.orderId}
                                      </td>
                                      <td className="text-center">
                                        {order?.paymentId}
                                      </td>
                                      <td className="text-center">
                                        {order?.status}
                                      </td>
                                      <td className="text-center">
                                        {!isUpdateDeliveryStatus[order?.id] && (
                                          <>
                                            <p>{order?.deliveryStatus}</p>
                                            <button
                                              onClick={() =>
                                                handleisUpdateDeliveryStatus(
                                                  order?.id
                                                )
                                              }
                                              style={{
                                                padding: "5px",
                                                backgroundColor: "#212529",
                                                color: "#fff",
                                                fontSize: "10px",
                                              }}
                                            >
                                              Update It
                                            </button>
                                          </>
                                        )}

                                        {isUpdateDeliveryStatus[order?.id] && (
                                          <>
                                            <form
                                              onSubmit={handleUpdateDelivery}
                                            >
                                              <input
                                                type="text"
                                                placeholder="Delivery Update"
                                                className="form-control"
                                                name="deliveryText"
                                                onClick={() =>
                                                  setupdateDeliveryCartId(
                                                    order.id
                                                  )
                                                }
                                              />

                                              <button
                                                type="submit"
                                                style={{
                                                  padding: "5px",
                                                  backgroundColor: "green",
                                                  border: "none",
                                                  color: "#fff",
                                                  fontSize: "10px",
                                                  marginTop: "10px",
                                                }}
                                              >
                                                Submit
                                              </button>
                                            </form>

                                            <button
                                              onClick={() =>
                                                handleisUpdateDeliveryStatus(
                                                  order?.id
                                                )
                                              }
                                              style={{
                                                padding: "5px",
                                                backgroundColor: "orange",
                                                color: "#fff",
                                                fontSize: "10px",
                                                border: "none",
                                              }}
                                            >
                                              Cancel
                                            </button>
                                          </>
                                        )}
                                      </td>
                                    </tr>

                                    {/* Nested Row */}
                                    {isToggleProductMoreDetail[order.id] && (
                                      <tr>
                                        <td colSpan={6}>
                                          <div
                                            className="table-responsive"
                                            style={{ paddingLeft: "60px" }}
                                          >
                                            <table className="table">
                                              <thead className="thead-dark">
                                                <tr>
                                                  <th scope="col">
                                                    {" "}
                                                    <BsFillImageFill
                                                      color="#000"
                                                      size={25}
                                                    />{" "}
                                                  </th>
                                                  <th scope="col">Name</th>
                                                  <th scope="col">Qty</th>
                                                  <th scope="col">Price</th>
                                                  <th scope="col">Total</th>
                                                  <th scope="col">Color</th>
                                                  <th scope="col">Size</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {userCartUserCartItem &&
                                                  userCartUserCartItem.map(
                                                    (cartItem, cartItemIdx) => {
                                                      const productUserCartItem =
                                                        cartItem.productUserCartItem &&
                                                        cartItem.productUserCartItem;
                                                      const productImage =
                                                        cartItem.productUserCartItem &&
                                                        cartItem
                                                          .productUserCartItem
                                                          .productImage;

                                                      const matchingSize =
                                                        cartItem.productUserCartItem.productSizesProduct.find(
                                                          (size) =>
                                                            size.PSize_id ===
                                                            cartItem.PSize_id
                                                        );

                                                      const matchingColor =
                                                        cartItem.productUserCartItem.productColorsProduct.find(
                                                          (color) =>
                                                            color.color_id ===
                                                            cartItem.color_id
                                                        );

                                                      const productDiscount =
                                                        (matchingSize.mrp *
                                                          matchingSize.discountPercent) /
                                                        100;

                                                      const productTotalPrice =
                                                        (matchingSize.mrp -
                                                          productDiscount) *
                                                        cartItem.qty;

                                                      return (
                                                        <tr key={cartItemIdx}>
                                                          <th scope="row">
                                                            <img
                                                              src={
                                                                productImage.url1
                                                              }
                                                              width={100}
                                                              height={100}
                                                              alt={
                                                                productUserCartItem?.name
                                                              }
                                                            />
                                                          </th>
                                                          <td>
                                                            <Link
                                                              target="_blank"
                                                              to={`/product/${
                                                                productUserCartItem.productCategory &&
                                                                productUserCartItem
                                                                  .productCategory
                                                                  .name
                                                              }/${
                                                                productUserCartItem.id
                                                              }/${
                                                                productUserCartItem.name
                                                              }`}
                                                            >
                                                              {
                                                                productUserCartItem?.name
                                                              }
                                                            </Link>
                                                          </td>
                                                          <td>
                                                            {cartItem?.qty}
                                                          </td>
                                                          <td>
                                                            {calculateProductDiscount(
                                                              matchingSize.mrp,
                                                              matchingSize.discountPercent
                                                            )}
                                                          </td>
                                                          <td>
                                                            {convertInInr(
                                                              productTotalPrice
                                                            )}
                                                          </td>

                                                          <td>
                                                            {matchingColor &&
                                                              matchingColor
                                                                .productColorsColor
                                                                .name}
                                                          </td>

                                                          <td>
                                                            {matchingSize &&
                                                              matchingSize
                                                                .pSizeProductSizes
                                                                .name}
                                                          </td>
                                                        </tr>
                                                      );
                                                    }
                                                  )}
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </React.Fragment>
                                );
                              })
                            );
                          } catch (error) {
                            console.log("Error - ", error.message);
                          }
                        })()}
                      </tbody>
                    </table>
                  );
                } else {
                  return (
                    <h6 className="text-center text-danger fs-5 fw-bold">
                      ... Loading
                    </h6>
                  );
                }
              } catch (error) {
                console.log("Error - ", error.message);
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPlacedOrders;
