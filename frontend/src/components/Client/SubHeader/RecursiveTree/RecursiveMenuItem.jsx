import React, { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";

export const RecursiveMenuItem = React.memo(({ item, depth = 0 }) => {
  const haveChildren = item.children && item.children.length > 0;
  //   console.log("item - ", item);
  const [selectParent, setselectParent] = useState(null);
  const handleMouseEnter = (id) => setselectParent(id);
  const handleMouseLeave = () => setselectParent(null);
  //   console.log("selectParent", selectParent);
  const [isHovered, setIsHovered] = useState(false);

  function checkIsChildMatchingParent(childParentId, selectParent) {
    return childParentId === selectParent;
  }

  return (function () {
    try {
      return (
        <li
          className="relative group"
          onMouseEnter={() => [handleMouseEnter(item?.id), setIsHovered(true)]}
          onMouseLeave={() => [handleMouseLeave(false), setIsHovered(false)]}
        >
          <div
            className={`px-4 py-2 hover:bg-red-700 hover:text-white cursor-pointer flex justify-between items-center ${
              isHovered ? "bg-red-700 text-white" : ""
            } `}
          >
            <span>{item.name}</span>

            {haveChildren && <AiOutlineMenuUnfold size={20} />}
          </div>

          {haveChildren && (
            <ul className="absolute left-full top-0 bg-white shadow-lg border w-[150px]">
              {item.children.map((child) => {
                // console.log("Child - ", child?.parentId === selectParent);
                if (checkIsChildMatchingParent(child?.parentId, selectParent)) {
                  return (
                    <RecursiveMenuItem
                      key={child.id}
                      item={child}
                      depth={depth + 1}
                    />
                  );
                }
              })}
            </ul>
          )}
        </li>
      );
    } catch (error) {
      console.log("Error - ", error);
    }
  })();
});
