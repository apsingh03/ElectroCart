import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PiTextTFill } from "react-icons/pi";
import { RiSortNumberAsc } from "react-icons/ri";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { AppContext } from "../../../context/AppContext";
import {
  bannerCarouselIsFavoriteAsync,
  createParentBannerCarouselAsync,
  deleteParentBannerCarouselAsync,
  getParentBannerCarouselAsync,
  updateParentBannerCarouselAsync,
} from "../../../Redux/AdminSlices/BannerCarousel/parentBannerCarouselSlice";

const ParentBannerCarousel = () => {
  const admin_parentBannerCarouselRedux = useSelector(
    (state) => state.admin_parentBannerCarousel.data
  );

  // console.log("admin_parentMenuRedux", admin_parentMenuRedux.query);

  const [updateParentName, setupdateParentName] = useState("");

  const { isLoadingTopProgress, setisLoadingTopProgress } =
    useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUpdateData, setisUpdateData] = useState({});

  const [updateBannerDetails, setupdateBannerDetails] = useState({
    name: "",
    animation: "",
    timer: "",
    width: "",
    height: "",
    objectFit: "",
  });

  const validationSchema = Yup.object().shape({
    groupName: Yup.string()
      .min(3, "Too Short!")
      .max(40, "Too Long!")
      .required("*Required"),
    isAnimation: Yup.boolean().required("*Required"),
    timer: Yup.number()
      .min(100, "Too Short!")
      .max(50000, "Too Long!")
      .required("*Required"),
    width: Yup.number().min(1, "Too Short!").required("*Required"),
    height: Yup.number().min(1, "Too Short!").required("*Required"),
    objectFit: Yup.string().required("*Option is Required"),
  });

  async function fetchData() {
    setisLoadingTopProgress(30);
    await dispatch(getParentBannerCarouselAsync());
    setisLoadingTopProgress(100);
  }

  async function deleteHandler(event, id) {
    // console.log("deleteHandler - ", id);
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Delete It ?")) {
      const actionResult = await dispatch(
        deleteParentBannerCarouselAsync({ id })
      );

      if (actionResult.payload?.msg === "success") {
        toast.success("Deleted");
      }
    }

    setisLoadingTopProgress(100);
  }

  // Function to filter out properties with empty values
  const filterEmptyValues = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== "")
    );
  };

  async function updateHandler(id) {
    // console.log("Itls also clicking ");

    setisLoadingTopProgress(30);

    const targetId = id;

    if (window.confirm("Are you sure want to Update It ?")) {
      const excludedData = filterEmptyValues(updateBannerDetails);
      // console.log("excludedData - ", excludedData);

      const actionResult = await dispatch(
        updateParentBannerCarouselAsync({
          updatedData: excludedData,
          id: targetId,
        })
      );

      if (actionResult.payload?.msg === "success") {
        toast.success("Updated");
        //   setupdateParentName({ targetId : false });

        setupdateBannerDetails((prevState) => ({
          ...prevState,
          name: "",
          animation: "",
          timer: "",
          width: "",
          height: "",
          objectFit: "",
        }));

        setisUpdateData((prevState) => ({
          ...prevState,
          [targetId]: !prevState[targetId],
        }));
      }
    }

    setisLoadingTopProgress(100);
  }

  async function toggleIsFavorite(id, isFavoriteStatus) {
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Update It ?")) {
      await dispatch(
        bannerCarouselIsFavoriteAsync({
          id,
          isFavoriteStatus,
        })
      );
    }

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id="adminRightSideWrapper" className="py-3">
        <div className="col-12 ">
          <div>
            <Formik
              initialValues={{
                groupName: "",
                isAnimation: "",
                timer: "",
                width: "",
                height: "",
                objectFit: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(true);
                  setisLoadingTopProgress(30);
                  const actionResult = await dispatch(
                    createParentBannerCarouselAsync({
                      name: values.groupName,
                      animation: values.isAnimation,
                      timer: values.timer,
                      width: values.width,
                      height: values.height,
                      objectFit: values.objectFit,
                    })
                  );

                  if (actionResult.payload?.msg === "Name Already Exist") {
                    values.groupName = "";
                    toast.error(actionResult.payload.msg);
                  }

                  if (actionResult.payload?.msg === "success") {
                    values.groupName = "";
                    values.isAnimation = "";
                    values.timer = "";
                    values.width = "";
                    values.height = "";
                    values.objectFit = "";
                    toast.success(actionResult.payload.msg);
                    setSubmitting(false);
                  }
                  //   console.log("actionResult - ", actionResult);

                  setisLoadingTopProgress(100);
                } catch (error) {
                  setisLoadingTopProgress(100);
                  console.log("Error Admin ", error.message);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="groupName">Banner Group Name</label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.groupName &&
                              touched.groupName &&
                              errors.groupName}
                          </p>
                        </div>

                        <div className="authPage__inputContainer">
                          <div className="authPage__inputContainer__icon">
                            <PiTextTFill size={30} />
                          </div>

                          <input
                            type="text"
                            className="form-control"
                            style={{ paddingLeft: "50px" }}
                            id="groupName"
                            name="groupName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.groupName}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="timer">
                            Timer In ms{" "}
                            <small
                              style={{
                                fontSize: "10px",
                                marginRight: "20px",
                                float: "inline-end",
                              }}
                            >
                              {" "}
                              1s = 1000 MS
                            </small>{" "}
                          </label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.timer && touched.timer && errors.timer}
                          </p>
                        </div>

                        <div className="authPage__inputContainer">
                          <div className="authPage__inputContainer__icon">
                            <RiSortNumberAsc size={30} />
                          </div>

                          <input
                            type="number"
                            className="form-control"
                            style={{ paddingLeft: "50px" }}
                            min={1}
                            id="timer"
                            name="timer"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.timer}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="width">Width  </label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.width && touched.width && errors.width}
                          </p>
                        </div>

                        <div className="authPage__inputContainer">
                          <div className="authPage__inputContainer__icon">
                            <PiTextTFill size={30} />
                          </div>

                          <input
                            type="text"
                            className="form-control"
                            style={{ paddingLeft: "50px" }}
                            id="width"
                            name="width"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.width}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="height">Height </label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.height && touched.height && errors.height}
                          </p>
                        </div>

                        <div className="authPage__inputContainer">
                          <div className="authPage__inputContainer__icon">
                            <PiTextTFill size={30} />
                          </div>

                          <input
                            type="text"
                            className="form-control"
                            style={{ paddingLeft: "50px" }}
                            id="height"
                            name="height"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.height}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="isAnimation">
                            Image Sliding Animation
                          </label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.isAnimation &&
                              touched.isAnimation &&
                              errors.isAnimation}
                          </p>
                        </div>

                        <select
                          className="form-select"
                          name="isAnimation"
                          id="isAnimation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.isAnimation}
                        >
                          <option>Select </option>

                          <option value="true"> Yes </option>
                          <option value="false"> No </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="objectFit">
                            Select Image Object Fit
                          </label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.objectFit &&
                              touched.objectFit &&
                              errors.objectFit}
                          </p>
                        </div>

                        <select
                          className="form-select"
                          name="objectFit"
                          id="objectFit"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.objectFit}
                        >
                          <option>Select </option>

                          <option value="contain"> contain </option>
                          <option value="cover"> cover </option>
                          <option value="fill"> fill </option>
                          <option value="none"> none </option>
                          <option value="scale-down"> scale-down </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="authPage__submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    Create Banner
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div id="adminRightSideWrapper" className="py-3 mt-3">
        <div className="col-12 mt-4 mt-lg-0 ">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col"> Name</th>
                  <th scope="col"> Animation</th>
                  <th scope="col"> Timer</th>
                  <th scope="col"> Width</th>
                  <th scope="col"> Height</th>
                  <th scope="col"> Object Fit</th>
                  <th scope="col">Is Favorite</th>
                  <th scope="col">Actions </th>
                </tr>
              </thead>
              <tbody>
                {(function () {
                  try {
                    return (
                      admin_parentBannerCarouselRedux.query &&
                      admin_parentBannerCarouselRedux.query.map(
                        (data, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                {isUpdateData[data.id] ? (
                                  <>
                                    <input
                                      type="text"
                                      value={updateBannerDetails.name}
                                      name="updateName"
                                      style={{ width: "100px" }}
                                      placeholder={data.name && data.name}
                                      onChange={(e) =>
                                        setupdateBannerDetails((prevState) => ({
                                          ...prevState,
                                          name: e.target.value,
                                        }))
                                      }
                                    />
                                  </>
                                ) : (
                                  data.name && data.name
                                )}{" "}
                              </td>
                              <td>
                                {isUpdateData[data.id] ? (
                                  <>
                                    <select
                                      name="updateAnimation"
                                      style={{ width: "100px" }}
                                      value={updateBannerDetails.animation}
                                      onChange={(e) =>
                                        setupdateBannerDetails((prevState) => ({
                                          ...prevState,
                                          animation: e.target.value,
                                        }))
                                      }
                                    >
                                      <option>Select</option>
                                      <option value="true">Yes</option>
                                      <option value="false">No</option>
                                    </select>
                                  </>
                                ) : data.animation && data.animation ? (
                                  "Yes"
                                ) : (
                                  "No"
                                )}
                              </td>
                              <td>
                                {" "}
                                {isUpdateData[data.id] ? (
                                  <>
                                    <input
                                      type="number"
                                      value={updateBannerDetails.timer}
                                      min={100}
                                      name="updateTimer"
                                      style={{ width: "100px" }}
                                      placeholder={data.timer && data.timer}
                                      onChange={(e) =>
                                        setupdateBannerDetails((prevState) => ({
                                          ...prevState,
                                          timer: e.target.value,
                                        }))
                                      }
                                    />
                                  </>
                                ) : (
                                  data.timer && data.timer
                                )}{" "}
                              </td>
                              <td>
                                {" "}
                                {isUpdateData[data.id] ? (
                                  <>
                                    <input
                                      type="text"
                                      value={updateBannerDetails.width}
                                      name="updateWidth"
                                      style={{ width: "100px" }}
                                      placeholder={data.width && data.width}
                                      onChange={(e) =>
                                        setupdateBannerDetails((prevState) => ({
                                          ...prevState,
                                          width: e.target.value,
                                        }))
                                      }
                                    />
                                  </>
                                ) : (
                                  data.width && data.width
                                )}{" "}
                              </td>
                              <td>
                                {" "}
                                {isUpdateData[data.id] ? (
                                  <>
                                    <input
                                      type="text"
                                      value={updateBannerDetails.height}
                                      name="updateHeight"
                                      style={{ width: "100px" }}
                                      placeholder={data.height && data.height}
                                      onChange={(e) =>
                                        setupdateBannerDetails((prevState) => ({
                                          ...prevState,
                                          height: e.target.value,
                                        }))
                                      }
                                    />
                                  </>
                                ) : (
                                  data.height && data.height
                                )}{" "}
                              </td>
                              <td>
                                {" "}
                                {isUpdateData[data.id] ? (
                                  <>
                                    <input
                                      type="text"
                                      value={updateBannerDetails.objectFit}
                                      name="updateObjectFit"
                                      style={{ width: "100px" }}
                                      placeholder={
                                        data.objectFit && data.objectFit
                                      }
                                      onChange={(e) =>
                                        setupdateBannerDetails((prevState) => ({
                                          ...prevState,
                                          objectFit: e.target.value,
                                        }))
                                      }
                                    />
                                  </>
                                ) : (
                                  data.objectFit && data.objectFit
                                )}{" "}
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
                                        <MdFavorite size={25} color="#000" />
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

                              <td>
                                <div
                                  className="d-flex flex-row "
                                  style={{ gap: "10px" }}
                                >
                                  {isUpdateData[data.id] ? (
                                    <>
                                      <span
                                        className="btn btn-warning btn-sm"
                                        onClick={() => [
                                          setisUpdateData((prevState) => ({
                                            ...prevState,
                                            [data.id]: !prevState[data.id],
                                          })),
                                        ]}
                                      >
                                        Cancel
                                      </span>

                                      <button
                                        type="submit"
                                        className="btn btn-success btn-sm"
                                        onClick={() => updateHandler(data.id)}
                                      >
                                        Submit
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      className="btn btn-primary btn-sm"
                                      onClick={() =>
                                        setisUpdateData((prevState) => ({
                                          ...prevState,
                                          [data.id]: !prevState[data.id],
                                        }))
                                      }
                                    >
                                      Update
                                    </button>
                                  )}

                                  <button
                                    className="btn btn-danger"
                                    onClick={(e) => {
                                      deleteHandler(e, data.id);
                                    }}
                                  >
                                    {" "}
                                    Delete{" "}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )
                    );
                  } catch (error) {
                    console.log("Error - ", error);
                  }
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentBannerCarousel;
