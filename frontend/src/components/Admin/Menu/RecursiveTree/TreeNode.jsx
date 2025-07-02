import React, { useState } from "react";
import NodeDetails from "./NodeDetails";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function TreeNode({
  node,
  isRoot,
  isLastChild,
  depth,
  addHandler,
  editHandler,
  deleteHandler,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children?.length > 0;

  return (
    <div className={`relative ${isRoot ? "ml-0" : "ml-16"}`}>
      {/* Lines */}
      {!isRoot && (
        <>
          <div
            className="absolute -left-6 top-0 w-[3px] bg-dark"
            style={{
              height: isLastChild ? "14px" : "100%",
            }}
          />
          <div className="absolute -left-6 top-3 w-8 h-1 rounded-lg bg-primary" />
        </>
      )}

      {/* Node + toggle */}
      <div
        className={`
          flex flex-row items-center gap-3 py-1 px-2 rounded-md transition-all duration-200
          ${hasChildren ? "cursor-pointer hover:bg-slate-200" : ""}
          ${
            isRoot
              ? "bg-dark border border-blue-200 mb-4"
              : "hover:bg-slate-200"
          }
        `}
      >
        {/* Expand/Collapse */}
        <div>
          {hasChildren ? (
            <div
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <FaMinusCircle size={20} color="blue" />
              ) : (
                <FaPlusCircle size={20} color="blue" />
              )}
            </div>
          ) : (
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
          )}
        </div>

        {/* Details */}
        <NodeDetails
          node={node}
          isRoot={isRoot}
          addHandler={addHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </div>

      {/* Children */}
      {hasChildren && isExpanded && <div>{children}</div>}
    </div>
  );
}
