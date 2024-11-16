import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PiTextTFill } from "react-icons/pi";
import {
  MdFavoriteBorder,
  MdPublishedWithChanges,
  MdUnpublished,
  MdFavorite,
} from "react-icons/md";

import { AppContext } from "../../../context/AppContext.js";
import {
  categoryIsFavoriteAsync,
  createCategoryAsync,
  deleteCategoryAsync,
  getCategoryAsync,
  updateCategoryAsync,
} from "../../../Redux/AdminSlices/Category/CategorySlice.js";

const Category = () => {
  const admin_categoryRedux = useSelector((state) => state.admin_category.data);

  // console.log("admin_categoryRedux - ", admin_categoryRedux.query);

  const [updateParentName, setupdateParentName] = useState("");

  const { isLoadingTopProgress, setisLoadingTopProgress } =
    useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUpdateData, setisUpdateData] = useState({});

  const validationSchema = Yup.object().shape({
    sizeName: Yup.string()
      .min(1, "Too Short!")
      .max(20, "Too Long!")
      .required("*Required"),
  });

  async function fetchData() {
    setisLoadingTopProgress(30);

    const actionResult = await dispatch(getCategoryAsync());

    setisLoadingTopProgress(100);
  }

  async function deleteHandler(event, id) {
    // console.log("deleteb");
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Delete It ?")) {
      const actionResult = await dispatch(deleteCategoryAsync({ id }));

      if (actionResult.payload.msg === "success") {
        toast.success("Deleted");
      }
    }

    setisLoadingTopProgress(100);
  }

  async function updateHandler(id) {
    // console.log("Itls also clicking ");

    setisLoadingTopProgress(30);

    const updatedValue = updateParentName;
    const targetId = id;

    if (updateParentName.length >= 1) {
      const actionResult = await dispatch(
        updateCategoryAsync({
          name: updatedValue,
          id: targetId,
        })
      );

      if (actionResult.payload.msg === "success") {
        toast.success("Updated");
        //   setupdateParentName({ targetId : false });

        setisUpdateData((prevState) => ({
          ...prevState,
          [targetId]: !prevState[targetId],
        }));
      }

      if (actionResult.payload.msg === "Name Already Exist") {
        toast.error(actionResult.payload.msg);
      }
    } else {
      toast.error("Please Type  ");
    }

    // console.log("actionResult - ", actionResult.payload);
    setupdateParentName("");
    setisLoadingTopProgress(100);
  }

  async function toggleIsFavorite(id, isFavoriteStatus) {
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Update It ?")) {
      const actionResult = await dispatch(
        categoryIsFavoriteAsync({
          id,
          isFavoriteStatus,
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
    <div id="adminRightSideWrapper" className="py-5">
      <div className="row col-12">
        <div className="col-12 col-lg-6">
          <div>
            <Formik
              initialValues={{
                sizeName: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setisLoadingTopProgress(30);

                  const actionResult = await dispatch(
                    createCategoryAsync({
                      name: values.sizeName,
                    })
                  );
                  if (actionResult.payload.msg === "Name Already Exist") {
                    values.sizeName = "";
                    toast.error(actionResult.payload.msg);
                  }
                  if (actionResult.payload.msg === "success") {
                    values.sizeName = "";
                    toast.success(actionResult.payload.msg);
                  }
                  // console.log("actionResult - ", actionResult);
                  setSubmitting(false);
                  setisLoadingTopProgress(100);
                } catch (error) {
                  setisLoadingTopProgress(100);
                  console.log("Error ", error.message);
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
                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="sizeName">Category Name</label>
                      <p className="authPage__inputFieldError px-3">
                        {errors.sizeName && touched.sizeName && errors.sizeName}
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
                        id="sizeName"
                        name="sizeName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sizeName}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="authPage__submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    Add
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>

        <div className="col-12 col-lg-6 mt-4 mt-lg-0 ">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    S.No
                  </th>
                  <th scope="col" className="text-center">
                    Category Name
                  </th>
                  <th scope="col" className="text-center">
                    Is Favorite
                  </th>
                  <th scope="col" className="text-center">
                    Total Products
                  </th>
                  <th scope="col" className="text-center">
                    Actions{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(function () {
                  try {
                    return (
                      admin_categoryRedux.query &&
                      admin_categoryRedux.query.map((data, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>

                            <td className="text-center">
                              {isUpdateData[data.id] ? (
                                <>
                                  <input
                                    type="text"
                                    value={updateParentName}
                                    name="updateParentName"
                                    placeholder={data.name && data.name}
                                    onChange={(e) =>
                                      setupdateParentName(e.target.value)
                                    }
                                  />

                                  <input
                                    type="hidden"
                                    value={data.id}
                                    name="updateParentId"

                                    //   onChange={(e) =>
                                    //     setupdateParentName(e.target.value)
                                    //   }
                                  />
                                </>
                              ) : (
                                data.name && data.name
                              )}
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

                            <td className="text-center">
                              {data.productCategory &&
                                data.productCategory.length}
                            </td>

                            <td className="text-center">
                              <div
                                className="d-flex flex-row "
                                style={{ gap: "20px" }}
                              >
                                {isUpdateData[data.id] ? (
                                  <>
                                    <span
                                      className="btn btn-warning"
                                      onClick={() =>
                                        setisUpdateData((prevState) => ({
                                          ...prevState,
                                          [data.id]: !prevState[data.id],
                                        }))
                                      }
                                    >
                                      Cancel
                                    </span>

                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                      onClick={() => updateHandler(data.id)}
                                    >
                                      Submit
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-primary"
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
    </div>
  );
};

export default Category;
