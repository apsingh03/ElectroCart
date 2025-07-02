import React from "react";
import { Link } from "react-router-dom";

export default function SubHeaderNestedNav({ childrenData }) {
  return (
    <div className="subHeader__one__nestedNav">
      {childrenData.map((child, idx) => (
        <Link
          key={idx}
          className="subHeader__one__nestedNav__link"
          target="_blank"
          to={child?.routeLink}
        >
          {child.name}
        </Link>
      ))}
    </div>
  );
}
