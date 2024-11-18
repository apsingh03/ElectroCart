import React, { useContext, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import { AppContext } from "./context/AppContext";
import LoadingBar from "react-top-loading-bar";

import Cart from "./components/Client/Cart";
import SideBarMenu from "./components/Client/SideBarMenu";
import SideFilter from "./components/Client/ProductsFilterPage/SideFilter";
import IsLoadingApp from "./components/Client/IsLoadingApp/IsLoadingApp";
import SideBarDebounceSearch from "./components/Client/SideBarDebounceSearch";

// Lazy load components jhjkhkjkk
const ProductFilterPage = lazy(() =>
  import("./pages/Client/ProductFilterPage")
);

// -------------- Client Pages
const HomePage = lazy(() => import("./pages/Client/HomePage"));
const ProductDetailPage = lazy(() =>
  import("./pages/Client/ProductDetailPage")
);
const ProjectCaseStudy = lazy(() =>
  import("./pages/Client/ProjectCaseStudy/ProjectCaseStudy")
);
const LogInPage = lazy(() => import("./pages/Client/LogInPage"));
const SignUpPage = lazy(() => import("./pages/Client/SignUpPage"));
// const SideBarDebounceSearch = lazy(() =>
//   import("./components/Client/SideBarDebounceSearch")
// );
// const SideBarMenu = lazy(() => import("./components/Client/SideBarMenu"));
const ClientDashboard = lazy(() => import("./pages/Client/ClientDashboard"));
const SideBarAllFilters = lazy(() =>
  import("./components/Client/ProductsFilterPage/SideBarAllFilters")
);
// const SideFilter = lazy(() =>
//   import("./components/Client/ProductsFilterPage/SideFilter")
// );
const WishList = lazy(() => import("./components/Client/WishList"));

// ------------- Admin Pages
const SignUpLoginPage = lazy(() => import("./pages/Admin/SignUpLoginPage"));
const AdminJunction = lazy(() => import("./pages/Admin/AdminJunction"));

// -------------  Protected Routes
const ClientProtectedRoutes = lazy(() =>
  import("./components/Client/ClientProtectedRoutes")
);
const AdminProtectedRoutes = lazy(() =>
  import("./components/Admin/AdminProtectedRoutes")
);

// Filters

function App() {
  const {
    isActiveSideBarMenu,
    setisActiveSideBarMenu,
    cartIsHover,
    setcartIsHover,
    isLoadingTopProgress,
    setisLoadingTopProgress,
    isFilterSideBarVisible,
    setIsFilterSideBarVisible,
    isActiveSideBarDebounce,
    setisActiveSideBarDebounce,
  } = useContext(AppContext);

  useEffect(() => {
    if (
      isActiveSideBarMenu ||
      cartIsHover ||
      isFilterSideBarVisible ||
      isActiveSideBarDebounce
    ) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [
    isActiveSideBarMenu,
    cartIsHover,
    isFilterSideBarVisible,
    isActiveSideBarDebounce,
  ]);

  return (
    <>
      <LoadingBar
        color="black"
        height={3}
        progress={isLoadingTopProgress}
        shadow={true}
        onLoaderFinished={() => setisLoadingTopProgress(0)}
      />

      {cartIsHover ? <Cart setcartIsHover={setcartIsHover} /> : null}
      {isActiveSideBarMenu ? (
        <SideBarMenu setisActiveSideBarMenu={setisActiveSideBarMenu} />
      ) : null}

      {isFilterSideBarVisible && (
        <SideFilter setIsFilterSideBarVisible={setIsFilterSideBarVisible} />
      )}

      {isActiveSideBarDebounce && (
        <SideBarDebounceSearch
          setisActiveSideBarDebounce={setisActiveSideBarDebounce}
        />
      )}

      {/* <SideBarDebounceSearch
        setisActiveSideBarDebounce={setisActiveSideBarDebounce}
      /> */}

      <Suspense fallback={<IsLoadingApp />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/collections/*" element={<ProductFilterPage />} />
          <Route path="/product/*" element={<ProductDetailPage />} />
          <Route path="/signin" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* CLIENT PROTECTED ROUTES */}
          <Route
            path="/account"
            element={<ClientProtectedRoutes element={<ClientDashboard />} />}
          />
          <Route path="/projectCaseStudy" element={<ProjectCaseStudy />} />
          <Route
            path="/wishlist"
            element={<ClientProtectedRoutes element={<WishList />} />}
          />

          {/* ADMIN Routes  */}
          <Route path="/admin/auth" element={<SignUpLoginPage />} />
          <Route
            path="/admin/*"
            element={<AdminProtectedRoutes element={<AdminJunction />} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
