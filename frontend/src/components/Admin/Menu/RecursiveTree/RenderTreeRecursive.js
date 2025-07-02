import React, { useState, useContext } from "react";
import { FaPlusCircle, FaMinusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppContext } from "../../../../context/AppContext";
import { PiTextTFill } from "react-icons/pi";
import {
  deleteMenuNestedSubMenuAsync,
  updateMenuNestedSubMenuAsync,
} from "../../../../Redux/AdminSlices/Menu/menuNestedSubMenu";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Modal from "../../Modal";
import TreeNode from "./TreeNode";

const RenderTreeRecursive = React.memo(
  ({
    node,
    depth = 0,
    isRoot = false,
    isLastChild = false,
    setIsModalOpen,
    selectNodeDetails,
    setselectNodeDetails,
  }) => {
    const admin_menuNestedSubMenuRedux = useSelector(
      (state) => state.admin_menuNestedSubMenu.data?.query
    );
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updateinitialData, setupdateInitialData] = useState({
      id: null,
      name: "",
      routeLink: "",
    }); // Store initial values
    const { setisLoadingTopProgress } = useContext(AppContext);
    // console.log("node - ", node);
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;
    const dispatch = useDispatch();
    const toggleExpanded = () => {
      if (hasChildren) {
        setIsExpanded(!isExpanded);
      }
    };

    function addHandler(id, name, parentId) {
      setIsModalOpen(true);
      setselectNodeDetails({
        id: id,
        name: name,
        parentId: parentId,
      });
    }

    async function deleteHandler(id, name) {
      setisLoadingTopProgress(30);

      if (window.confirm("Are you sure want to Delete It ?")) {
        const data =
          admin_menuNestedSubMenuRedux &&
          admin_menuNestedSubMenuRedux.filter((data) => data?.parentId === id);

        if (
          data?.length > 0 &&
          window.confirm(
            `You are deleting a Parent -  ${name}  & it will also delete all linked ${data?.length}  childrens `
          )
        ) {
          const actionResult = await dispatch(
            deleteMenuNestedSubMenuAsync({ id })
          );
          if (actionResult.payload.msg === "success") {
            toast.success("Deleted");
          }
        } else {
          const actionResult = await dispatch(
            deleteMenuNestedSubMenuAsync({ id })
          );
          if (actionResult.payload.msg === "success") {
            toast.success("Deleted");
          }
        }
      }

      setisLoadingTopProgress(100);
    }

    const filterEmptyValues = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value !== "")
      );
    };

    function editHandler(id, name, parentId, routeLink) {
      // console.log("-->", id, name, parentId, routeLink);

      setupdateInitialData({ id, name, routeLink });
      setIsEditModalOpen(true);
    }

    async function updateHandler(e) {
      // console.log("Itls also clicking ");
      e.preventDefault();
      setisLoadingTopProgress(30);

      // const updatedValue = updateParentName;
      const targetId = updateinitialData?.id;

      if (window.confirm("Are you sure want to Update it ?")) {
        const excludedData = filterEmptyValues(updateinitialData);
        // console.log("update - ", targetId, excludedData);
        const actionResult = await dispatch(
          updateMenuNestedSubMenuAsync({
            updatedData: excludedData,
            id: targetId,
          })
        );

        if (actionResult.payload.msg === "success") {
          toast.success("Updated");
          //   setupdateParentName({ targetId : false });

          setupdateInitialData({
            id: null,
            name: "",
            routeLink: "",
          });
        }

        if (actionResult.payload.msg === "Name Already Exist") {
          toast.error(actionResult.payload.msg);
        }
      }

      // console.log("actionResult - ", actionResult.payload);
      // setupdateParentName("");
      setisLoadingTopProgress(100);
      setIsEditModalOpen(false);
    }

    return (function () {
      try {
        return (
          <>
            <Modal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            >
              <form onSubmit={updateHandler}>
                <div className="">
                  <div className="d-flex align-items-baseline">
                    <label htmlFor="filterName">Child Menu Name</label>
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
                      onChange={(e) =>
                        setupdateInitialData((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }))
                      }
                      value={updateinitialData?.name}
                    />
                  </div>
                </div>

                <div className="">
                  <div className="d-flex align-items-baseline">
                    <label htmlFor="updateRouteLink">Route Link</label>
                  </div>

                  <div className="authPage__inputContainer">
                    <div className="authPage__inputContainer__icon">
                      <PiTextTFill size={30} />
                    </div>

                    <input
                      type="text"
                      className="form-control"
                      style={{ paddingLeft: "50px" }}
                      id="updateRouteLink"
                      name="updateRouteLink"
                      onChange={(e) =>
                        setupdateInitialData((prevState) => ({
                          ...prevState,
                          routeLink: e.target.value,
                        }))
                      }
                      value={updateinitialData?.routeLink}
                    />
                  </div>
                </div>

                <input
                  type="hidden"
                  value={updateinitialData.id}
                  name="updateParentId"
                />

                <div className="col-12  mt-2">
                  <button type="submit" className="authPage__submitBtn mt-3">
                    Update It
                  </button>
                </div>
              </form>
            </Modal>

            <TreeNode
              node={node}
              isRoot={depth === 0}
              isLastChild={isLastChild}
              depth={depth}
              addHandler={addHandler}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            >
              {node.children?.map((child, index) => (
                <RenderTreeRecursive
                  key={child.id}
                  node={child}
                  isLastChild={index === node.children.length - 1}
                  depth={depth + 1}
                  addHandler={addHandler}
                  editHandler={editHandler}
                  deleteHandler={deleteHandler}
                />
              ))}
            </TreeNode>
          </>
        );
      } catch (error) {
        console.log("Error while showing Tree - ", error);
      }
    })();
  }
);

export default RenderTreeRecursive;
