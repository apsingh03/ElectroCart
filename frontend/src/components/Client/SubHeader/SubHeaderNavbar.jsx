import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import SubHeaderNestedNav from "./SubHeaderNestedNav";

export default function SubHeaderNavbar({
  loading,
  menuData,
  activeCategory,
  handleMouseEnter,
  handleMouseLeave,
}) {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f0f0f0">
      <div className="subHeader__one__child__navbar">
        {loading ? (
          <>
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="subHeader__one__child__navbar__navLink">
                <Skeleton width={120} height={20} />
              </div>
            ))}
          </>
        ) : (
          menuData?.map((category, idx) => (
            <div
              key={idx}
              className="subHeader__one__child__navbar__navLink"
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={category.routeLink} target="_blank">
                {category.name}
              </Link>

              {activeCategory === category.id &&
                category.menuChildData?.length > 0 && (
                  <SubHeaderNestedNav childrenData={category.menuChildData} />
                )}
            </div>
          ))
        )}
      </div>
    </SkeletonTheme>
  );
}
