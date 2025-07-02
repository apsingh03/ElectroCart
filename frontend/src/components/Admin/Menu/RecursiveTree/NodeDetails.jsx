import React from "react";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function NodeDetails({
  node,
  isRoot,
  addHandler,
  editHandler,
  deleteHandler,
}) {
  return (
    <div
      className={`flex flex-row flex-1 justify-between items-center text-base font-medium select-none ${
        isRoot ? "text-white text-lg" : "text-slate-700 border-b"
      }`}
    >
      <p>
        <span className="text-sm">Id -</span> {node.id}
      </p>
      <p>
        <span className="text-sm">Name -</span> {node.name}
      </p>
      <p>
        <span className="text-sm">Parent -</span>{" "}
        {node.parentId === null ? "Null" : node.parentId}
      </p>
      <p>
        <span className="text-sm">Route -</span> {node.routeLink}
      </p>

      <div className="flex flex-row gap-2">
        <button
          title={`Add Child Under ${node?.name}`}
          onClick={() => addHandler(node?.id, node?.name, node.parentId)}
          className="px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          <FaPlusCircle size={15} />
        </button>
        <button
          title="Edit"
          onClick={() =>
            editHandler(node?.id, node?.name, node.parentId, node.routeLink)
          }
          className="px-2 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
        >
          <FaRegEdit size={15} />
        </button>
        <button
          title="Delete"
          onClick={() => deleteHandler(node?.id, node?.name)}
          className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
        >
          <MdDelete size={15} />
        </button>
      </div>
    </div>
  );
}
