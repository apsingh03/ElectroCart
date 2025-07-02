import React, { useState, useMemo } from "react";
import { RecursiveMenuItem } from "./RecursiveMenuItem";

export const SidebarMenu = React.memo(({ menuData }) => {
  const [isActiveMenu, setisActiveMenu] = useState(true);
  const preparedMenu = useMemo(() => {
    if (!Array.isArray(menuData)) return [];
    return menuData;
  }, [menuData]);

  return (function () {
    try {
      return (
        <div
          className="relative w-52  inline-block group"
          onMouseEnter={() => setisActiveMenu(true)}
          onMouseLeave={() => setisActiveMenu(false)}
        >
          <h2 className="text-sm font-semibold  cursor-pointer ">
            Recursive Menu SubMenu
          </h2>

          {isActiveMenu && (
            <ul className="absolute left-0 top-full bg-white border shadow w-40 hidden group-hover:block z-10">
              {preparedMenu.map((item) => (
                <RecursiveMenuItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>
      );
    } catch (error) {
      console.log("Error - ", error);
    }
  })();
});
