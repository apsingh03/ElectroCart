import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PiTextTFill } from "react-icons/pi";

import { AppContext } from "../../../context/AppContext";
import { getParentCategoryBrandAsync } from "../../../Redux/AdminSlices/CategoryBrand/parentCategoryBrandSlice";
import {
  createChildCategoryBrandAsync,
  deleteChildCategoryBrandAsync,
  getChildCategoryBrandAsync,
  updateChildCategoryBrandAsync,
} from "../../../Redux/AdminSlices/CategoryBrand/childCategoryBrandSlice";

const ChildCategoryBrand = () => {
  const admin_parentMenuRedux = useSelector(
    (state) => state.admin_parentCategoryBrand.data
  );

  const admin_childMenuRedux = useSelector(
    (state) => state.admin_childCategoryBrand.data
  );

  // console.log("admin_childMenuRedux - ", admin_childMenuRedux.query);

  const [updateParentName, setupdateParentName] = useState("");

  const { isLoadingTopProgress, setisLoadingTopProgress } =
    useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUpdateData, setisUpdateData] = useState({});

  const validationSchema = Yup.object().shape({
    filterName: Yup.string()
      .min(1, "Too Short!")
      .max(20, "Too Long!")
      .required("*Required"),

    parentId: Yup.string().required("*Option is Required"),
  });

  async function fetchFilter() {
    setisLoadingTopProgress(30);

    await dispatch(getParentCategoryBrandAsync());
    await dispatch(getChildCategoryBrandAsync());

    setisLoadingTopProgress(100);
  }

  async function deleteHandler(event, id) {
    // console.log("deleteb");
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Delete It ?")) {
      const actionResult = await dispatch(
        deleteChildCategoryBrandAsync({ id })
      );

      if (actionResult.payload.msg === "success") {
        toast.success("Deleted");
      }
    }

    setisLoadingTopProgress(100);
  }

  async function updateHandler(id, parentId) {
    // console.log("Itls also clicking ");

    setisLoadingTopProgress(30);

    const updatedValue = updateParentName;
    const targetId = id;

    if (updateParentName.length >= 1) {
      const actionResult = await dispatch(
        updateChildCategoryBrandAsync({
          name: updatedValue,
          id: targetId,
          parentId,
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

  useEffect(() => {
    fetchFilter();
  }, []);

  return (
    <div id="adminRightSideWrapper" className="py-5">
      <div className="row col-12">
        <div className="col-12 col-lg-6">
          <div>
            <Formik
              initialValues={{
                parentId: "",
                filterName: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setisLoadingTopProgress(30);

                  const actionResult = await dispatch(
                    createChildCategoryBrandAsync({
                      name: values.filterName,
                      parent_id: values.parentId,
                    })
                  );
                  if (actionResult.payload.msg === "Name Already Exist") {
                    values.filterName = "";
                    toast.error(actionResult.payload.msg);
                  }
                  if (actionResult.payload.msg === "success") {
                    values.filterName = "";
                    toast.success(actionResult.payload.msg);
                  }
                  // console.log("actionResult - ", actionResult);
                  setSubmitting(false);
                  setisLoadingTopProgress(100);
                } catch (error) {
                  setisLoadingTopProgress(100);
                  console.log("Error client SignUp ", error.message);
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
                  <div className="mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="parentId">
                        Select Parent Category Name
                      </label>
                      <p className="authPage__inputFieldError px-3">
                        {errors.parentId && touched.parentId && errors.parentId}
                      </p>
                    </div>

                    <select
                      className="form-select"
                      name="parentId"
                      id="parentId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.parentId}
                    >
                      <option>Please Select Parent</option>

                      {(function () {
                        try {
                          return (
                            admin_parentMenuRedux.query &&
                            admin_parentMenuRedux.query.map((data, index) => {
                              return (
                                <option value={`${data.id}`} key={index}>
                                  {data.name}
                                </option>
                              );
                            })
                          );
                        } catch (error) {
                          console.log("Error - ", error);
                        }
                      })()}
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="filterName">Child Brand Name</label>
                      <p className="authPage__inputFieldError px-3">
                        {errors.filterName &&
                          touched.filterName &&
                          errors.filterName}
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
                        id="filterName"
                        name="filterName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.filterName}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="authPage__submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    Create Brand Name Under Category
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
                  <th scope="col">S.No</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Brand Name</th>
                  <th scope="col">Actions </th>
                </tr>
              </thead>
              <tbody>
                {(function () {
                  try {
                    return (
                      admin_childMenuRedux.query &&
                      admin_childMenuRedux.query.map((data, index) => {
                        // console.log("data - ", data);

                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>

                            <td>
                              {data.categoryBrandChildData &&
                                data.categoryBrandChildData.name}
                            </td>

                            <td>
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
                            <td>
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
                                      onClick={() =>
                                        updateHandler(data.id, data?.parent_id)
                                      }
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

export default ChildCategoryBrand;
