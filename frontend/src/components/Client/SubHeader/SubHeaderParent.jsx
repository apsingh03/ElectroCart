import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { GiHamburgerMenu } from "react-icons/gi";

export default function SubHeaderParent({ loading }) {
  return loading ? (
    <div
      className="subHeader__one__parent"
      style={{ display: "flex", gap: "10px" }}
    >
      <span>
        <Skeleton width={40} height={20} />
      </span>
      <span className="subHeader__one__title">
        <Skeleton width={120} height={20} />
      </span>
    </div>
  ) : (
    <div className="d-flex items-center gap-2 subHeader__one__parent">
      <span>
        <GiHamburgerMenu />
      </span>
      <span className="subHeader__one__title">Shop by Department</span>
    </div>
  );
}
