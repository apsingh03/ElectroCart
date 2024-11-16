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
import { uploadImageOnAws } from "../../../utils/UploadOnAws";
import { getParentTestimonialAsync } from "../../../Redux/AdminSlices/Testimonial/parentTestimonialSlice";

import {
  getChildTestimonialAsync,
  createChildTestimonialAsync,
  deleteChildTestimonialAsync,
  updateChildTestimonialAsync,
  childTestimonialIsFavoriteAsync,
} from "../../../Redux/AdminSlices/Testimonial/childTestimonialSlice";

const ChildTestimonial = () => {
  const admin_parentTestimonialRedux = useSelector(
    (state) => state.admin_parentTestimonial.data
  );

  const admin_childTestimonialRedux = useSelector(
    (state) => state.admin_childTestimonial.data
  );

  const { setisLoadingTopProgress } = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUpdateData, setisUpdateData] = useState({});

  const [updateBannerDetails, setupdateBannerDetails] = useState({
    customerName: "",
    imageAlt: "",
    customerMsg: "",
  });

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().min(2, "Too Short!").required("*Required"),
    imageAlt: Yup.string().min(2, "Too Short!").required("*Required"),
    customerMsg: Yup.string().min(2, "Too Short!").required("*Required"),
    parent_id: Yup.number().required("*Required"),
  });

  const [bannerImage, setbannerImage] = useState({
    objectUrl: "",
    file: "",
  });

  const handleImageFileChange = async (e) => {
    // console.log(e.target.files);

    const fileName = e.target.files[0];
    const objUrl = URL.createObjectURL(fileName);
    setbannerImage((prevState) => ({
      ...prevState,
      objectUrl: objUrl,
      file: fileName,
    }));
  };

  async function deleteHandler(event, id) {
    // console.log("deleteHandler - ", id);
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Delete It ?")) {
      const actionResult = await dispatch(deleteChildTestimonialAsync({ id }));

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
        updateChildTestimonialAsync({
          updatedData: excludedData,
          id: targetId,
        })
      );

      if (actionResult.payload?.msg === "success") {
        toast.success("Updated");
        //   setupdateParentName({ targetId : false });
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
        childTestimonialIsFavoriteAsync({
          id,
          isFavoriteStatus,
        })
      );
      // console.log("query - ", actionResult);
    }

    setisLoadingTopProgress(100);
  }

  async function fetchData() {
    setisLoadingTopProgress(30);
    await dispatch(getParentTestimonialAsync());
    await dispatch(getChildTestimonialAsync());

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
                customerName: "",
                imageAlt: "",
                customerMsg: "",
                parent_id: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  // setSubmitting(true);
                  setisLoadingTopProgress(30);

                  // console.log("bannerImage - ", bannerImage.file);

                  if (
                    bannerImage.file.length === 0 &&
                    bannerImage.objectUrl.length === 0
                  ) {
                    toast.warning("Please select an Image");
                  } else {
                    // console.log(values);
                    toast.warning(
                      "Please wait image uploading on AWS Server ... "
                    );

                    const awsUploadedImageUrl = await uploadImageOnAws(
                      bannerImage.file
                    );
                    setisLoadingTopProgress(70);
                    toast.success(
                      "Image Uploaded On AWS & Sending data to Backend ..."
                    );

                    const actionResult = await dispatch(
                      createChildTestimonialAsync({
                        customerName: values.customerName,
                        imageSrc: awsUploadedImageUrl,
                        imageAlt: values.imageAlt,
                        customerMsg: values.customerMsg,
                        parent_id: values.parent_id,
                      })
                    );

                    // console.log("actionResult - ", actionResult);

                    if (actionResult.payload?.msg === "success") {
                      values.imageAlt = "";
                      values.parent_id = "";
                      values.customerMsg = "";
                      values.customerName = "";
                      //    imagesFile.forEach((file) => URL.revokeObjectURL(file.preview));
                      setbannerImage({
                        file: null,
                      });

                      URL.revokeObjectURL(bannerImage.objectUrl);

                      toast.success(actionResult.payload.msg);
                      setSubmitting(false);
                    }
                    setisLoadingTopProgress(100);
                  }
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
                          <label htmlFor="imageSrc">Image Src</label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.imageSrc &&
                              touched.imageSrc &&
                              errors.imageSrc}
                          </p>
                        </div>

                        <div className="authPage__inputContainer">
                          <input
                            type="file"
                            className="form-control"
                            id="imageSrc"
                            name="imageSrc"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            onBlur={handleBlur}
                            value={values.imageSrc}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="imageAlt">Image Alt </label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.imageAlt &&
                              touched.imageAlt &&
                              errors.imageAlt}
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
                            min={1}
                            id="imageAlt"
                            name="imageAlt"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.imageAlt}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4">
                      <div className="form-group mb-3 mt-2">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="customerName">Customer Name </label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.customerName &&
                              touched.customerName &&
                              errors.customerName}
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
                            min={1}
                            id="customerName"
                            name="customerName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.customerName}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="parent_id">
                            Select Testimonial Parent
                          </label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.parent_id &&
                              touched.parent_id &&
                              errors.parent_id}
                          </p>
                        </div>

                        <select
                          className="form-select"
                          name="parent_id"
                          id="parent_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.parent_id}
                        >
                          <option>Select </option>

                          {(function () {
                            try {
                              return (
                                admin_parentTestimonialRedux.query &&
                                admin_parentTestimonialRedux.query.map(
                                  (data, idx) => {
                                    return (
                                      <option value={data.id} key={idx}>
                                        {" "}
                                        {data.name}
                                      </option>
                                    );
                                  }
                                )
                              );
                            } catch (error) {
                              console.log("Error - ", error.message);
                            }
                          })()}
                        </select>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="form-group mb-3 mt-2">
                        <div className="d-flex align-items-baseline">
                          <label htmlFor="customerMsg">Message </label>
                          <p className="authPage__inputFieldError px-3">
                            {errors.customerMsg &&
                              touched.customerMsg &&
                              errors.customerMsg}
                          </p>
                        </div>

                        <div className="authPage__inputContainer">
                          <div className="authPage__inputContainer__icon">
                            <PiTextTFill size={30} />
                          </div>

                          <textarea
                            rows={3}
                            className="form-control"
                            style={{ paddingLeft: "50px" }}
                            id="customerMsg"
                            name="customerMsg"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.customerMsg}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  {bannerImage.objectUrl && (
                    <img
                      src={bannerImage.objectUrl}
                      alt="banner"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "500px",
                      }}
                    />
                  )}

                  <button
                    type="submit"
                    className="authPage__submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    Add Testimonial Detail
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
                  <th scope="col"> Parent Name </th>
                  <th scope="col"> Customer Name </th>
                  <th scope="col"> Image src</th>
                  <th scope="col"> Image Alt</th>
                  <th scope="col">Message</th>
                  <th scope="col">Is Favorite</th>
                  <th scope="col">Actions </th>
                </tr>
              </thead>
              <tbody>
                {(function () {
                  try {
                    return (
                      admin_childTestimonialRedux.query &&
                      admin_childTestimonialRedux.query.map((data, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>

                            <td>{data?.testimonialDetailsTestimonial?.name}</td>

                            <td>
                              {isUpdateData[data.id] ? (
                                <>
                                  <input
                                    type="text"
                                    value={updateBannerDetails.customerName}
                                    name="updateName"
                                    className="form-control"
                                    placeholder={
                                      data.customerName && data.customerName
                                    }
                                    onChange={(e) =>
                                      setupdateBannerDetails((prevState) => ({
                                        ...prevState,
                                        customerName: e.target.value,
                                      }))
                                    }
                                  />
                                </>
                              ) : (
                                data.customerName && data.customerName
                              )}{" "}
                            </td>

                            <td>
                              <img
                                src={data?.imageSrc}
                                width={200}
                                height={200}
                                style={{ objectFit: "cover" }}
                              />
                            </td>

                            <td>
                              {isUpdateData[data.id] ? (
                                <>
                                  <input
                                    type="text"
                                    value={updateBannerDetails.imageAlt}
                                    name="updateImageAlt"
                                    className="form-control"
                                    placeholder={data.imageAlt && data.imageAlt}
                                    onChange={(e) =>
                                      setupdateBannerDetails((prevState) => ({
                                        ...prevState,
                                        imageAlt: e.target.value,
                                      }))
                                    }
                                  />
                                </>
                              ) : (
                                data.imageAlt && data.imageAlt
                              )}{" "}
                            </td>

                            <td>
                              {" "}
                              {isUpdateData[data.id] ? (
                                <>
                                  <textarea
                                    rows={8}
                                    value={updateBannerDetails.customerMsg}
                                    name="updateCustomerMsg"
                                    className="form-control"
                                    placeholder={
                                      data.customerMsg && data.customerMsg
                                    }
                                    onChange={(e) =>
                                      setupdateBannerDetails((prevState) => ({
                                        ...prevState,
                                        customerMsg: e.target.value,
                                      }))
                                    }
                                  ></textarea>

                                  {/* <input
                                    type="text"
                                    value={updateBannerDetails.customerMsg}
                                    name="updateCustomerMsg"
                                    className="form-control"
                                    placeholder={
                                      data.customerMsg && data.customerMsg
                                    }
                                    onChange={(e) =>
                                      setupdateBannerDetails((prevState) => ({
                                        ...prevState,
                                        customerMsg: e.target.value,
                                      }))
                                    }
                                  /> */}
                                </>
                              ) : (
                                data.customerMsg && data.customerMsg
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
                                        toggleIsFavorite(data.id, "favoriteIt")
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
                      })
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

export default ChildTestimonial;
