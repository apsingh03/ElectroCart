import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isActiveSideBarMenu, setisActiveSideBarMenu] = useState(false);
  const [cartIsHover, setcartIsHover] = useState(false);
  const [isLoadingTopProgress, setisLoadingTopProgress] = useState(0);
  const [isFilterSideBarVisible, setIsFilterSideBarVisible] = useState(false);
  const [isLoadingWishList, setisLoadingWishList] = useState(false);
  const [isLoadingDebounceSearch, setisLoadingDebounceSearch] = useState(false);
  const [isActiveDebounceChildContainer, setisActiveDebounceChildContainer] =
    useState(false);

  const [isActiveSideBarDebounce, setisActiveSideBarDebounce] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isActiveSideBarMenu,
        setisActiveSideBarMenu,
        cartIsHover,
        setcartIsHover,
        isLoadingTopProgress,
        setisLoadingTopProgress,
        isFilterSideBarVisible,
        setIsFilterSideBarVisible,
        isLoadingWishList,
        setisLoadingWishList,
        isLoadingDebounceSearch,
        setisLoadingDebounceSearch,
        isActiveDebounceChildContainer,
        setisActiveDebounceChildContainer,
        isActiveSideBarDebounce,
        setisActiveSideBarDebounce,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
