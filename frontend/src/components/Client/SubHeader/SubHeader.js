import React, { useState } from "react";
import { FaMobileAlt, FaTabletAlt, FaLaptop } from "react-icons/fa";
// import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SubHeader = ({ menuData }) => {
  // console.log("menuData - ", menuData);
  const [activeCategory, setActiveCategory] = useState(null);

  const menuIsLoading = !menuData || !menuData;

  // console.log("menuIsLoading - ", menuIsLoading);

  const handleMouseEnter = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (function () {
    try {
      return (
        <div className="subHeader">
          <div className="subHeader__one">
            {menuIsLoading ? (
              <div
                className="subHeader__one__parent "
                style={{ display: "flex", gap: "10px" }}
              >
                <span>
                  {" "}
                  <Skeleton width={40} height={20} />
                </span>
                <span className="subHeader__one__title">
                  {" "}
                  <Skeleton width={120} height={20} />{" "}
                </span>
              </div>
            ) : (
              <div className="subHeader__one__parent">
                <span>
                  {" "}
                  <GiHamburgerMenu />{" "}
                </span>
                <span className="subHeader__one__title">
                  Shop by Department
                </span>
              </div>
            )}

            <div className="subHeader__one__child">
              <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
                <div className="subHeader__one__child__navbar">
                  {/* Check if menuData is loaded; show skeletons if loading */}
                  {menuIsLoading ? (
                    // Display skeletons for loading state
                    <>
                      {[...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="subHeader__one__child__navbar__navLink"
                        >
                          <Skeleton width={120} height={20} />
                        </div>
                      ))}
                    </>
                  ) : (
                    // Display menu items once loaded
                    menuData &&
                    menuData.map((category, idx) => (
                      <div
                        key={idx}
                        className="subHeader__one__child__navbar__navLink"
                        onMouseEnter={() => handleMouseEnter(category.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link to={category?.routeLink} target="_blank">
                          {category.name}
                        </Link>

                        {/* Display nested menu items if the category is active */}
                        {activeCategory === category.id &&
                          category.menuChildData.length > 0 && (
                            <div className="subHeader__one__nestedNav">
                              {category.menuChildData.map((child, childIdx) => (
                                <Link
                                  key={childIdx}
                                  className="subHeader__one__nestedNav__link"
                                  target="_blank"
                                  to={child?.routeLink}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          )}
                      </div>
                    ))
                  )}
                </div>
              </SkeletonTheme>
            </div>
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

export default SubHeader;
