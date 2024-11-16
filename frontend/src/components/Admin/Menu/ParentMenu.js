import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PiTextTFill } from "react-icons/pi";
import {
  createParentMenuAsync,
  deleteParentMenuAsync,
  getParentMenuAsync,
  updateParentMenuAsync,
} from "../../../Redux/AdminSlices/Menu/parentMenuSlice";
import { AppContext } from "../../../context/AppContext";

const ParentMenu = () => {
  const admin_parentMenuRedux = useSelector(
    (state) => state.admin_parentMenu.data
  );

  // console.log("admin_parentMenuRedux", admin_parentMenuRedux.query);

  const [updateParentName, setupdateParentName] = useState("");
  const [updateinitialData, setupdateInitialData] = useState({
    name: "",
    routeLink: "",
  }); // Store initial values

  const { isLoadingTopProgress, setisLoadingTopProgress } =
    useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUpdateData, setisUpdateData] = useState({});

  const validationSchema = Yup.object().shape({
    filterName: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("*Required"),
    routeLink: Yup.string().min(1, "Too Short!").required("*Required"),
  });

  async function fetchParentFilter() {
    setisLoadingTopProgress(30);
    await dispatch(getParentMenuAsync());
    setisLoadingTopProgress(100);
  }

  async function deleteHandler(event, id) {
    // console.log("deleteb");
    setisLoadingTopProgress(30);

    if (window.confirm("Are you sure want to Delete It ?")) {
      const actionResult = await dispatch(deleteParentMenuAsync({ id }));

      if (actionResult.payload.msg === "success") {
        toast.success("Deleted");
      }
    }

    setisLoadingTopProgress(100);
  }

  const filterEmptyValues = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== "")
    );
  };

  async function updateHandler(id) {
    // console.log("Itls also clicking ");

    setisLoadingTopProgress(30);

    const updatedValue = updateParentName;
    const targetId = id;

    if (window.confirm("Are you sure want to Update it ?")) {
      const excludedData = filterEmptyValues(updateinitialData);
      const actionResult = await dispatch(
        updateParentMenuAsync({
          updatedData: excludedData,
          id: targetId,
        })
      );

      if (actionResult.payload.msg === "success") {
        toast.success("Updated");
        //   setupdateParentName({ targetId : false });

        setupdateInitialData((prev) => ({
          ...prev,
          name: "",
          routeLink: "",
        }));

        setisUpdateData((prevState) => ({
          ...prevState,
          [targetId]: !prevState[targetId],
        }));
      }

      if (actionResult.payload.msg === "Name Already Exist") {
        toast.error(actionResult.payload.msg);
      }
    }

    // console.log("actionResult - ", actionResult.payload);
    setupdateParentName("");
    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchParentFilter();
  }, []);

  return (
    <div id="adminRightSideWrapper" className="py-5">
      <div className="row col-12">
        <div className="col-12 col-lg-6">
          <div>
            <Formik
              initialValues={{
                filterName: "",
                routeLink: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setisLoadingTopProgress(30);
                  const actionResult = await dispatch(
                    createParentMenuAsync({
                      name: values.filterName,
                      routeLink: values.routeLink,
                    })
                  );

                  if (actionResult.payload.msg === "Name Already Exist") {
                    values.filterName = "";

                    toast.error(actionResult.payload?.msg);
                  }

                  if (actionResult.payload.msg === "success") {
                    values.filterName = "";
                    values.routeLink = "";
                    toast.success(actionResult.payload?.msg);
                  }
                  //   console.log("actionResult - ", actionResult);
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
                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="filterName">Parent Menu Name</label>
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

                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="filterName">Route Link</label>
                      <p className="authPage__inputFieldError px-3">
                        {errors.routeLink &&
                          touched.routeLink &&
                          errors.routeLink}
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
                        id="routeLink"
                        name="routeLink"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.routeLink}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="authPage__submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    Create Menu
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
                  <th scope="col">Menu Name</th>
                  <th scope="col">Route Link</th>
                  <th scope="col">Actions </th>
                </tr>
              </thead>
              <tbody>
                {(function () {
                  try {
                    return (
                      admin_parentMenuRedux.query &&
                      admin_parentMenuRedux.query.map((data, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>

                            <td>
                              {isUpdateData[data.id] ? (
                                <>
                                  <input
                                    type="text"
                                    value={updateinitialData?.name}
                                    name="updateParentName"
                                    placeholder={data.name && data.name}
                                    onChange={(e) =>
                                      setupdateInitialData((prevState) => ({
                                        ...prevState,
                                        name: e.target.value,
                                      }))
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
                              {isUpdateData[data.id] ? (
                                <>
                                  <input
                                    type="text"
                                    // value={routeLink || data?.routeLink}
                                    value={updateinitialData?.routeLink}
                                    name="updateRouteLink"
                                    placeholder={
                                      data.routeLink && data.routeLink
                                    }
                                    onChange={(e) =>
                                      setupdateInitialData((prevState) => ({
                                        ...prevState,
                                        routeLink: e.target.value,
                                      }))
                                    }
                                  />
                                </>
                              ) : (
                                data.routeLink && data.routeLink
                              )}
                            </td>

                            <td>
                              <div
                                className="d-flex flex-row "
                                style={{ gap: "10px" }}
                              >
                                {isUpdateData[data.id] ? (
                                  <>
                                    <span
                                      className="btn btn-warning"
                                      onClick={() => [
                                        setisUpdateData((prevState) => ({
                                          ...prevState,
                                          [data.id]: !prevState[data.id],
                                        })),
                                        setupdateParentName(" "),
                                      ]}
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

export default ParentMenu;
