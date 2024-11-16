import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductAsync,
  productIsRecycleBinAsync,
} from "../../../Redux/AdminSlices/Product/ProductSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  calculateProductDiscount,
  convertInInr,
} from "../../../utils/productDiscountCalculate";

const RecycleBin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setisLoadingTopProgress } = useContext(AppContext);
  const [isToggleProductMoreDetail, setisToggleProductMoreDetail] = useState(
    {}
  );

  const admin_productRedux = useSelector((state) => state.admin_product.data);

  // console.log("admin_productRedux - ", admin_productRedux);

  async function fetchData() {
    setisLoadingTopProgress(30);
    await dispatch(getProductAsync());
    setisLoadingTopProgress(100);
  }

  function handleProductMoreDetailToggle(id) {
    setisToggleProductMoreDetail((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  async function toggleIsRecycleBin(id, isRecycleStatus) {
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Restore It ?")) {
      const actionResult = await dispatch(
        productIsRecycleBinAsync({
          id,
          isRecycleStatus,
        })
      );
      // console.log("query - ", actionResult);
    }

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h4 className="text-center mb-3">Recycle Bin</h4>
      <div id="adminRightSideWrapper">
        <div className="listedProducts">
          <div className="table-responsive">
            {(function () {
              try {
                if (
                  admin_productRedux.query &&
                  admin_productRedux.query.length > 0
                ) {
                  return (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">
                            <BsFillImageFill />
                          </th>
                          <th scope="col">Product Name</th>

                          <th scope="col">Category</th>
                          {/* <th scope="col"> Date </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {(function () {
                          try {
                            return (
                              admin_productRedux.query &&
                              admin_productRedux.query.map((data, index) => {
                                if (data.isRecycleBin === true) {
                                  return (
                                    <tr key={index}>
                                      <td scope="row">
                                        <div className="productImage">
                                          <img
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                            }}
                                          />
                                        </div>
                                      </td>

                                      <td className="listedProducts__2nd">
                                        <h6 className="">
                                          {data.name && data.name}
                                        </h6>

                                        <div className="listedProducts__2nd__actions">
                                          <span>
                                            Id - {data.id && data.id}{" "}
                                          </span>

                                          <div>
                                            <Link
                                              to="#"
                                              className="listedProducts__2nd__actions__btn"
                                            >
                                              {" "}
                                              View{" "}
                                            </Link>
                                          </div>
                                          <div
                                            onClick={() =>
                                              toggleIsRecycleBin(
                                                data.id,
                                                "restoreIt"
                                              )
                                            }
                                          >
                                            <Link
                                              to="#"
                                              className="listedProducts__2nd__actions__btn text-primary "
                                            >
                                              {" "}
                                              Restore It
                                            </Link>
                                          </div>
                                          <div>
                                            <Link
                                              to="#"
                                              className="listedProducts__2nd__actions__btn text-danger "
                                            >
                                              {" "}
                                              Delete Permanently{" "}
                                            </Link>
                                          </div>
                                        </div>

                                        <div className="listedProducts__2nd__toggle">
                                          <h6
                                            className="listedProducts__2nd__toggle__title"
                                            onClick={() =>
                                              handleProductMoreDetailToggle(
                                                data.id
                                              )
                                            }
                                          >
                                            More Details
                                            <span
                                              style={{ marginLeft: "10px" }}
                                            >
                                              {isToggleProductMoreDetail[
                                                data.id
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

                                          <div
                                            className={`listedProducts__2nd__toggle__child ${
                                              isToggleProductMoreDetail[data.id]
                                                ? "active"
                                                : "notActive"
                                            } `}
                                          >
                                            <div className="listedProducts__2nd__colors">
                                              <div>
                                                {" "}
                                                <span className="listedProducts__2nd__colors__title">
                                                  Available Colors -{" "}
                                                </span>
                                              </div>
                                              <div className="listedProducts__2nd__colors__wrapper">
                                                {data.productColorsProduct &&
                                                  data.productColorsProduct.map(
                                                    (data, index) => {
                                                      return (
                                                        <div
                                                          className="listedProducts__2nd__colors__wrapper__color"
                                                          style={{
                                                            backgroundColor: `${
                                                              data.productColorsColor &&
                                                              data
                                                                .productColorsColor
                                                                .name
                                                            }`,
                                                          }}
                                                          title={`${
                                                            data.productColorsColor &&
                                                            data
                                                              .productColorsColor
                                                              .name
                                                          }`}
                                                          key={index}
                                                        ></div>
                                                      );
                                                    }
                                                  )}
                                              </div>
                                            </div>

                                            <div className="listedProducts__2nd__sizes">
                                              <div>
                                                <span className="listedProducts__2nd__colors__title">
                                                  Available Sizes -{" "}
                                                </span>
                                              </div>
                                              <div className="listedProducts__2nd__sizes__wrapper">
                                                {data.productSizesProduct &&
                                                  data.productSizesProduct.map(
                                                    (data, index) => {
                                                      return (
                                                        <div
                                                          className="listedProducts__2nd__sizes__wrapper__size"
                                                          key={index}
                                                        >
                                                          <p
                                                            className="listedProducts__2nd__sizes__wrapper__size__text"
                                                            style={{
                                                              fontSize: "20px",
                                                              fontWeight: "700",
                                                              color: "#393030",
                                                            }}
                                                          >
                                                            {data.pSizeProductSizes &&
                                                              data
                                                                .pSizeProductSizes
                                                                .name}
                                                          </p>
                                                          {(function () {
                                                            if (
                                                              data.pSizeProductSizes &&
                                                              data
                                                                .pSizeProductSizes
                                                                .qty > 5
                                                            ) {
                                                              return (
                                                                <p
                                                                  className="listedProducts__2nd__sizes__wrapper__size__text"
                                                                  style={{
                                                                    marginTop:
                                                                      "-10px",
                                                                    fontSize:
                                                                      "14px",
                                                                    fontWeight:
                                                                      "500",
                                                                    color:
                                                                      "green",
                                                                  }}
                                                                >
                                                                  Qty -{" "}
                                                                  {data.pSizeProductSizes &&
                                                                    data
                                                                      .pSizeProductSizes
                                                                      .qty}
                                                                </p>
                                                              );
                                                            } else {
                                                              return (
                                                                <p
                                                                  className="listedProducts__2nd__sizes__wrapper__size__text"
                                                                  style={{
                                                                    marginTop:
                                                                      "-10px",
                                                                    fontSize:
                                                                      "14px",
                                                                    fontWeight:
                                                                      "500",
                                                                    color:
                                                                      "red",
                                                                  }}
                                                                >
                                                                  Qty -{" "}
                                                                  {data.pSizeProductSizes &&
                                                                    data
                                                                      .pSizeProductSizes
                                                                      .qty}
                                                                </p>
                                                              );
                                                            }
                                                          })()}

                                                          <p
                                                            className="listedProducts__2nd__sizes__wrapper__size__text"
                                                            style={{
                                                              marginTop:
                                                                "-10px",
                                                              fontSize: "10px",
                                                              fontWeight: "500",
                                                            }}
                                                          >
                                                            Mrp -{" "}
                                                            <span
                                                              style={{
                                                                textDecoration:
                                                                  "line-through",
                                                              }}
                                                            >
                                                              {convertInInr(
                                                                data.mrp &&
                                                                  data.mrp
                                                              )}
                                                            </span>
                                                          </p>
                                                          <p
                                                            className="listedProducts__2nd__sizes__wrapper__size__text"
                                                            style={{
                                                              marginTop:
                                                                "-15px",
                                                              fontSize: "12px",
                                                              fontWeight: "400",
                                                              color: "red",
                                                            }}
                                                          >
                                                            % off -{" "}
                                                            {data.discountPercent &&
                                                              data.discountPercent}
                                                          </p>

                                                          <p
                                                            className="listedProducts__2nd__sizes__wrapper__size__text"
                                                            style={{
                                                              marginTop:
                                                                "-10px",
                                                              fontSize: "16px",
                                                              fontWeight: "600",
                                                              color: "blue",
                                                            }}
                                                          >
                                                            {calculateProductDiscount(
                                                              data.mrp &&
                                                                data.mrp,
                                                              data.discountPercent &&
                                                                data.discountPercent
                                                            )}
                                                          </p>
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                              </div>
                                            </div>

                                            <div className="listedProducts__2nd__fabric">
                                              <div>
                                                <span className="listedProducts__2nd__colors__title">
                                                  Product Fabric -
                                                </span>
                                              </div>
                                              <div className="listedProducts__2nd__fabric__wrapper">
                                                {data.productFabricsProduct &&
                                                  data.productFabricsProduct.map(
                                                    (data, index) => {
                                                      return (
                                                        <div
                                                          className="listedProducts__2nd__fabric__wrapper__fabric"
                                                          key={index}
                                                        >
                                                          {" "}
                                                          <span className="listedProducts__2nd__fabric__wrapper__fabric__text">
                                                            {data.productFabricsFabric &&
                                                              data
                                                                .productFabricsFabric
                                                                .name}
                                                          </span>
                                                          {","}
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>

                                      <td className="">
                                        {" "}
                                        {data.productCategory &&
                                          data.productCategory.name}{" "}
                                      </td>
                                    </tr>
                                  );
                                }
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

export default RecycleBin;
