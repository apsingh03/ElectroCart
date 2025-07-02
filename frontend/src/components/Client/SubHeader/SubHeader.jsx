import React, { useMemo, useState } from "react";
import { FaMobileAlt, FaTabletAlt, FaLaptop } from "react-icons/fa";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import { useSelector, useDispatch } from "react-redux";
import SubHeaderNavbar from "./SubHeaderNavbar";
import SubHeaderParent from "./SubHeaderParent";
import { buildTree } from "../../../utils/RecursionTree/BuildTree";
import { SidebarMenu } from "./RecursiveTree/SidebarMenu";

const SubHeader = ({ menuData, menuNestedSubMenu }) => {
  // console.log("menuData - ", menuData);
  const [activeCategory, setActiveCategory] = useState(null);

  const menuIsLoading = !menuData || !menuData;

  const nestedTree = useMemo(() => {
    return buildTree(menuNestedSubMenu);
  }, [menuNestedSubMenu]);

  const treeIsLoading = !nestedTree || !nestedTree;

  // console.log("nestedTree - ", nestedTree);

  const handleMouseEnter = (id) => setActiveCategory(id);
  const handleMouseLeave = () => setActiveCategory(null);

  return (function () {
    try {
      return (
        <div className="subHeader">
          <div className="subHeader__one">
            <SubHeaderParent loading={menuIsLoading} />

            <div className="subHeader__one__child">
              <SubHeaderNavbar
                loading={menuIsLoading}
                menuData={menuData}
                activeCategory={activeCategory}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            </div>
          </div>
          <div>
            {treeIsLoading ? (
              <Skeleton width={120} height={20} />
            ) : (
              <SidebarMenu menuData={nestedTree} />
            )}
          </div>

          <div className="subHeader__two ">
            {(function () {
              if (menuIsLoading) {
                return (
                  <div className="d-flex flex-row gap-1">
                    {" "}
                    <Skeleton width={50} />
                    <Skeleton width={50} />
                    <Skeleton width={50} />
                  </div>
                );
              } else {
                return (
                  menuData &&
                  menuData.map((menu, idx) => {
                    return (
                      <div className="subHeader__two__iconBox" key={idx}>
                        <span className="subHeader__two__iconBox__icon">
                          {menu?.name === "Mobiles" ? <FaMobileAlt /> : null}
                          {menu?.name === "Tablet" ? <FaTabletAlt /> : null}
                          {menu?.name === "Tv's" ? <FaLaptop /> : null}
                        </span>
                        <Link
                          className="subHeader__two__iconBox__title text-decoration-none"
                          to={menu?.routeLink}
                          target="_blank"
                        >
                          {menu?.name}{" "}
                        </Link>
                      </div>
                    );
                  })
                );
              }
            })()}
          </div>
        </div>
      );
    } catch (error) {}
  })();
};

export default React.memo(SubHeader);
