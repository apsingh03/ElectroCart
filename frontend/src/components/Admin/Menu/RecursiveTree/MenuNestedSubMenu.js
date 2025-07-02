import React, { useContext, useEffect, useState, useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PiTextTFill } from "react-icons/pi";
import { FaPlusCircle } from "react-icons/fa";
import {
  createMenuNestedSubMenuAsync,
  deleteMenuNestedSubMenuAsync,
  getMenuNestedSubMenuAsync,
  updateMenuNestedSubMenuAsync,
} from "../../../../Redux/AdminSlices/Menu/menuNestedSubMenu";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import { getParentMenuAsync } from "../../../Redux/AdminSlices/Menu/";

import { AppContext } from "../../../../context/AppContext";
import RenderTreeRecursive from "./RenderTreeRecursive";
import Modal from "../../Modal";
import { buildTree } from "../../../../utils/RecursionTree/BuildTree";

const MenuNestedSubMenu = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const admin_menuNestedSubMenuRedux = useSelector(
    (state) => state.admin_menuNestedSubMenu.data?.query
  );

  const [selectNodeDetails, setselectNodeDetails] = useState({
    id: null,
    name: null,
    parentId: null,
  });

  // console.log("admin_menuNestedSubMenuRedux - ", admin_menuNestedSubMenuRedux);

  const { isLoadingTopProgress, setisLoadingTopProgress } =
    useContext(AppContext);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    filterName: Yup.string()
      .min(1, "Too Short!")
      .max(20, "Too Long!")
      .required("*Required"),
    routeLink: Yup.string().min(1, "Too Short!").required("*Required"),

    // parentId: Yup.string().required("*Option is Required"),
  });

  function addNodeAtRootLevel() {
    setIsModalOpen(true);
    setselectNodeDetails({
      id: null,
      name: null,
      parentId: null,
    });
  }

  async function fetchParentFilter() {
    setisLoadingTopProgress(30);
    await dispatch(getMenuNestedSubMenuAsync());
    setisLoadingTopProgress(100);
  }

  const nestedTree = useMemo(() => {
    return buildTree(admin_menuNestedSubMenuRedux);
  }, [admin_menuNestedSubMenuRedux]);

  const treeIsLoading = !nestedTree || !nestedTree;
  // console.log("menuIsLoading - ", menuIsLoading);

  useEffect(() => {
    fetchParentFilter();
  }, []);

  return (
    <div id="adminRightSideWrapper" className="py-5">
      <div className="row col-12">
        {treeIsLoading ? (
          <>
            <Skeleton width={"100%"} height={40} />
            <div className="my-2"></div>
            <Skeleton width={"100%"} height={300} />
          </>
        ) : (
          <>
            <button
              className="inline-flex items-center justify-center gap-2 px-4 py-2 m-3  bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => addNodeAtRootLevel()}
            >
              <FaPlusCircle size={20} color="white" />{" "}
              <span>Add Menu At Root Level</span>
            </button>

            <div className="">
              {(function () {
                try {
                  return (
                    nestedTree &&
                    nestedTree.map((treeNode, index) => (
                      <RenderTreeRecursive
                        setIsModalOpen={setIsModalOpen}
                        key={treeNode.id}
                        node={treeNode}
                        isRoot={true}
                        selectNodeDetails={selectNodeDetails}
                        setselectNodeDetails={setselectNodeDetails}
                      />
                    ))
                  );
                } catch (error) {
                  console.error("Rendering Tree Node");
                }
              })()}
            </div>
          </>
        )}

        <div className="col-12">
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
                    // console.log("values , - ", values);
                    const actionResult = await dispatch(
                      createMenuNestedSubMenuAsync({
                        name: values.filterName,
                        parent_id: selectNodeDetails?.id || null,
                        routeLink: values.routeLink,
                      })
                    );
                    if (
                      actionResult.payload.msg ===
                      "Name Already Exist Under this Parent"
                    ) {
                      values.filterName = "";
                      toast.error(actionResult.payload.msg);
                    }
                    if (actionResult.payload.msg === "success") {
                      values.filterName = "";
                      values.routeLink = "";
                      toast.success(actionResult.payload.msg);
                    }
                    // console.log("actionResult - ", actionResult);
                    setSubmitting(false);
                    setselectNodeDetails({
                      id: null,
                      name: null,
                      parentId: null,
                    });
                    setIsModalOpen(false);
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
                    <div className="">
                      <div className="col-12 ">
                        <p>Selected Node Details</p>
                        <div className="form-group mb-3">
                          <div className="flex flex-row gap-2">
                            <div>
                              <div className="d-flex align-items-baseline">
                                <label htmlFor="selectedId">ID</label>
                              </div>
                              <div className="flex flex-col authPage__inputContainer">
                                <input
                                  type="text"
                                  className="form-control"
                                  style={{ paddingLeft: "50px" }}
                                  id="selectedId"
                                  name="selectedId"
                                  disabled
                                  value={selectNodeDetails?.id}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="d-flex align-items-baseline">
                                <label htmlFor="filterName">Name</label>
                              </div>
                              <div className="flex flex-col authPage__inputContainer">
                                <input
                                  type="text"
                                  className="form-control"
                                  style={{ paddingLeft: "50px" }}
                                  id="filterName"
                                  name="filterName"
                                  disabled
                                  value={selectNodeDetails?.name}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="d-flex align-items-baseline">
                                <label htmlFor="filterName">Parent</label>
                              </div>

                              <div className="flex flex-col authPage__inputContainer">
                                <input
                                  type="text"
                                  className="form-control"
                                  style={{ paddingLeft: "50px" }}
                                  id="filterName"
                                  name="filterName"
                                  disabled
                                  value={selectNodeDetails?.parentId}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <div className="">
                          <div className="d-flex align-items-baseline">
                            <label htmlFor="filterName">Child Menu Name</label>
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
                      </div>

                      <div className="col-12  ">
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
                      </div>

                      <div className="col-12  mt-2">
                        <button
                          type="submit"
                          className="authPage__submitBtn mt-3"
                          disabled={isSubmitting}
                        >
                          Save Menu
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
});

export default MenuNestedSubMenu;
