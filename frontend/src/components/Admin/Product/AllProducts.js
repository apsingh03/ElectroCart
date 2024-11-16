import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";

import {
  MdFavorite,
  MdFavoriteBorder,
  MdPublishedWithChanges,
  MdUnpublished,
} from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductAsync,
  productIsFavoriteAsync,
  productIsPublishedAsync,
  productIsRecycleBinAsync,
} from "../../../Redux/AdminSlices/Product/ProductSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  calculateProductDiscount,
  convertInInr,
} from "../../../utils/productDiscountCalculate";

import { convertDate, formatDate } from "../../../utils/convertTime";

const AllProducts = (props) => {
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

  async function toggleIsPublished(id, isPublishStatus) {
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Update It ?")) {
      const actionResult = await dispatch(
        productIsPublishedAsync({
          id,
          isPublishStatus,
        })
      );
      // console.log("query - ", actionResult);
    }

    setisLoadingTopProgress(100);
  }

  async function toggleIsFavorite(id, isFavoriteStatus) {
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Update It ?")) {
      const actionResult = await dispatch(
        productIsFavoriteAsync({
          id,
          isFavoriteStatus,
        })
      );
      // console.log("query - ", actionResult);
    }

    setisLoadingTopProgress(100);
  }

  async function toggleIsRecycleBin(id, isRecycleStatus) {
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to delete It ?")) {
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
      <h4 className="text-center mb-3">All Listed Products</h4>
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
                          <th scope="col" className="text-center">
                            <BsFillImageFill size={20} color="#000" />
                          </th>
                          <th scope="col">Product Name</th>
                          <th scope="col" className="text-center">
                            Category
                          </th>
                          <th scope="col" className="text-center">
                            Brand
                          </th>
                          <th scope="col" className="text-center">
                            Is Published
                          </th>
                          <th scope="col" className="text-center">
                            Is Favorite
                          </th>
                          <th scope="col" className="text-center">
                            {" "}
                            Date{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(function () {
                          try {
                            return (
                              admin_productRedux.query &&
                              admin_productRedux.query.map((data, index) => {
                                if (data.isRecycleBin === false) {
                                  // console.log("data - ", data);
                                  return (
                                    <tr key={index}>
                                      <td scope="row" className="text-center">
                                        <div className="productImage">
                                          <img
                                            src={data.productImage.url1}
                                            alt="products data photo"
                                            style={{
                                              width: "100px",
                                              height: "100px",
                                              objectFit: "cover",
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
                                              target="_blank"
                                              to={`/product/${
                                                data.productCategory &&
                                                data.productCategory.name
                                              }/${data.id}/${data.name}`}
                                              className="listedProducts__2nd__actions__btn"
                                            >
                                              {" "}
                                              View{" "}
                                            </Link>
                                          </div>
                                          <div>
                                            <Link
                                              to="#"
                                              className="listedProducts__2nd__actions__btn"
                                            >
                                              {" "}
                                              Edit{" "}
                                            </Link>
                                          </div>
                                          <div>
                                            <Link
                                              to="#"
                                              className="listedProducts__2nd__actions__btn"
                                              onClick={() =>
                                                toggleIsRecycleBin(
                                                  data.id,
                                                  "moveIt"
                                                )
                                              }
                                            >
                                              {" "}
                                              Trash{" "}
                                            </Link>
                                          </div>
                                          <div>
                                            <Link
                                              to="#"
                                              className="listedProducts__2nd__actions__btn"
                                            >
                                              {" "}
                                              Duplicate{" "}
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
                                                            fontSize: "14px",
                                                          }}
                                                          title={`${
                                                            data.productColorsColor &&
                                                            data
                                                              .productColorsColor
                                                              .name
                                                          }`}
                                                          key={index}
                                                        >
                                                          {data.productColorsColor &&
                                                            data
                                                              .productColorsColor
                                                              .name}
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                              </div>
                                            </div>

                                            <div className="listedProducts__2nd__sizes">
                                              <div>
                                                <span className="listedProducts__2nd__colors__title">
                                                  Available -{" "}
                                                </span>
                                              </div>
                                              <div className="listedProducts__2nd__sizes__wrapper">
                                                {data.productSizesProduct &&
                                                  [
                                                    ...(data.productSizesProduct ||
                                                      []),
                                                  ]
                                                    .sort(
                                                      (a, b) => a.mrp - b.mrp
                                                    )
                                                    .map((size, index) => {
                                                      return (
                                                        <div
                                                          className="listedProducts__2nd__sizes__wrapper__size"
                                                          key={index}
                                                        >
                                                          <p
                                                            className="listedProducts__2nd__sizes__wrapper__size__text"
                                                            style={{
                                                              fontSize: "16px",
                                                              fontWeight: "700",
                                                              color: "#393030",
                                                              fontFamily:
                                                                "Lato",
                                                            }}
                                                          >
                                                            {size.pSizeProductSizes &&
                                                              size
                                                                .pSizeProductSizes
                                                                .name}
                                                          </p>
                                                          {(function () {
                                                            if (
                                                              size.pSizeProductSizes &&
                                                              size
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
                                                                  {size.pSizeProductSizes &&
                                                                    size
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
                                                                  {size.pSizeProductSizes &&
                                                                    size
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
                                                                size.mrp &&
                                                                  size.mrp
                                                              )}
                                                            </span>
                                                          </p>
                                                          <p
                                                            className="listedProducts__2nd__sizes__wrapper__size__text"
                                                            style={{
                                                              marginTop:
                                                                "-15px",
                                                              fontSize: "12px",
                                                              fontWeight: "600",
                                                              color: "red",
                                                            }}
                                                          >
                                                            % off -{" "}
                                                            {size.discountPercent &&
                                                              size.discountPercent}
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
                                                              size.mrp &&
                                                                size.mrp,
                                                              size.discountPercent &&
                                                                size.discountPercent
                                                            )}
                                                          </p>
                                                        </div>
                                                      );
                                                    })}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>

                                      <td className="text-center">
                                        {" "}
                                        {data.productCategory &&
                                          data.productCategory.name}{" "}
                                      </td>

                                      <td className="text-center">
                                        {" "}
                                        {data.productBrand &&
                                          data.productBrand.name}{" "}
                                      </td>

                                      <td className="text-center">
                                        {(function () {
                                          if (data.isPublished === true) {
                                            return (
                                              <span
                                                style={{ cursor: "pointer" }}
                                                title="UnPublish It"
                                                onClick={() =>
                                                  toggleIsPublished(
                                                    data.id,
                                                    "unPublishedIt"
                                                  )
                                                }
                                              >
                                                <FaCheckCircle
                                                  size={25}
                                                  color="#000"
                                                />
                                              </span>
                                            );
                                          }

                                          if (data.isPublished === false) {
                                            return (
                                              <span
                                                style={{ cursor: "pointer" }}
                                                title="Publish It"
                                                onClick={() =>
                                                  toggleIsPublished(
                                                    data.id,
                                                    "PublishIt"
                                                  )
                                                }
                                              >
                                                <RxCrossCircled
                                                  size={25}
                                                  color="#000"
                                                />
                                              </span>
                                            );
                                          }
                                        })()}
                                      </td>

                                      <td className="text-center">
                                        {(function () {
                                          if (data.isFavorite === true) {
                                            return (
                                              <span
                                                style={{ cursor: "pointer" }}
                                                title="UnFavorite It"
                                                onClick={() =>
                                                  toggleIsFavorite(
                                                    data.id,
                                                    "unFavoriteIt"
                                                  )
                                                }
                                              >
                                                <MdFavorite
                                                  size={25}
                                                  color="#000"
                                                />
                                              </span>
                                            );
                                          }

                                          if (data.isFavorite === false) {
                                            return (
                                              <span
                                                style={{ cursor: "pointer" }}
                                                title="Favorite It"
                                                onClick={() =>
                                                  toggleIsFavorite(
                                                    data.id,
                                                    "favoriteIt"
                                                  )
                                                }
                                              >
                                                <MdFavoriteBorder
                                                  size={25}
                                                  color="#000"
                                                />
                                              </span>
                                            );
                                          }
                                        })()}
                                      </td>

                                      <td className="text-center">
                                        <span>
                                          {formatDate(data.createdAt)}
                                        </span>
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

export default AllProducts;
