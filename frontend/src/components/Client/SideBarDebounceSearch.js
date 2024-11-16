import React, { useEffect, useState, useContext, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { RiArrowLeftUpLine } from "react-icons/ri";
import { clientDebouncedSearchAsync } from "../../Redux/ClientSlices/clientDebounceSearchSlice";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
const SideBarDebounceSearch = ({ setisActiveSideBarDebounce }) => {
  const dispatch = useDispatch();
  const client_debounceSearch = useSelector(
    (state) => state.client_debounceSearch.data
  );

  const [searchQuery, setsearchQuery] = useState("");

  const {
    isLoadingDebounceSearch,
    setisLoadingDebounceSearch,
    isActiveDebounceChildContainer,
    setisActiveDebounceChildContainer,
  } = useContext(AppContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 1) {
        fetchData();
      }
    }, 500); // Adjust the delay time as needed (500ms is common)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  async function fetchData() {
    setisLoadingDebounceSearch(true);
    // console.log("searchQuery - ", searchQuery);
    await dispatch(clientDebouncedSearchAsync({ inputQuery: searchQuery }));

    setisLoadingDebounceSearch(false);
  }

  return (
    <div className="sideMenu">
      {/* sideMenu__header */}
      {/* d-flex flex-row align-items-center p-3 */}
      <div className="sideMenu__header  ">
        <div
          onClick={() => setisActiveSideBarDebounce((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <FaArrowLeft />
        </div>

        <div style={{ position: "relative" }}>
          <div className="header__3rdContainer__debounce__parent">
            <span className="header__3rdContainer__debounce__parent__icons">
              <IoSearch />
            </span>
            <input
              type="text"
              className="header__3rdContainer__debounce__parent__input"
              placeholder="Search"
              id="SearchBox"
              autoComplete="off"
              onChange={(e) => setsearchQuery(e.target.value)}
              value={searchQuery}
            />
            {isLoadingDebounceSearch && (
              <span className="header__3rdContainer__debounce__parent__isLoading">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></span>
              </span>
            )}
          </div>
        </div>
      </div>
      <div style={{ padding: "0 10px", overflowY: "scroll" }}>
        {(function () {
          try {
            return (
              <>
                <div
                  className="d-flex flex-row justify-content-between align-items-baseline"
                  style={{
                    margin: "10px 0",
                  }}
                >
                  <h6
                    className="header__3rdContainer__debounce__child__title"
                    style={{ fontSize: "16px" }}
                  >
                    Your Searches
                  </h6>
                </div>

                <div className="header__3rdContainer__debounce__child__searchesContainer">
                  {client_debounceSearch.query &&
                  client_debounceSearch.query.length > 0 ? (
                    client_debounceSearch.query &&
                    client_debounceSearch.query.map((data, idx) => {
                      return (
                        <div
                          className="header__3rdContainer__debounce__child__searchesContainer__card"
                          key={idx}
                        >
                          <div className="header__3rdContainer__debounce__child__searchesContainer__card__1st">
                            <div className="header__3rdContainer__debounce__child__searchesContainer__card__1st__leftUpLineIcon">
                              <IoSearch />
                            </div>

                            <div
                              className="header__3rdContainer__debounce__child__searchesContainer__card__1st__searchText"
                              style={{ paddingRight: "5px" }}
                            >
                              <Link
                                to={`/product/${data?.productCategory?.name}/${data.id}/${data.name}`}
                                onClick={() =>
                                  setisActiveSideBarDebounce((prev) => !prev)
                                }
                              >
                                {data.id && data.id} {data.name && data.name}
                              </Link>
                            </div>
                          </div>

                          <div className="header__3rdContainer__debounce__child__searchesContainer__card__2nd">
                            <div className="header__3rdContainer__debounce__child__searchesContainer__card__2nd__leftUpLine">
                              <RiArrowLeftUpLine />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : isLoadingDebounceSearch === false ? (
                    <p className="header__3rdContainer__debounce__child__searchesContainer__card__1st__searchText mt-2">
                      Sorry No Results
                    </p>
                  ) : null}
                </div>
              </>
            );
          } catch (error) {
            console.log("Error SideBarMenu - ", error.message);
          }
        })()}
      </div>
    </div>
  );
};

export default SideBarDebounceSearch;
