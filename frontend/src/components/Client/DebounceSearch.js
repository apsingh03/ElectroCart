import React, { useEffect, useState, useContext } from "react";
import { IoSearch, IoLayersOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { RiArrowLeftUpLine } from "react-icons/ri";
import { clientDebouncedSearchAsync } from "../../Redux/ClientSlices/clientDebounceSearchSlice";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
const DebounceSearch = () => {
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
    <div className="header__3rdContainer__debounce">
      {(function () {
        try {
          return (
            <>
              <div className="header__3rdContainer__debounce__parent">
                <label htmlFor="SearchBox" className="visually-hidden">
                  Search
                </label>
                <span className="header__3rdContainer__debounce__parent__icons">
                  <IoLayersOutline />
                  <span>All Categories</span>
                </span>
                <input
                  type="text"
                  className="header__3rdContainer__debounce__parent__input"
                  // placeholder="Search"
                  id="SearchBox"
                  autoComplete="off"
                  onClick={() => setisActiveDebounceChildContainer(true)}
                  onChange={(e) => setsearchQuery(e.target.value)}
                  value={searchQuery}
                  style={{ padding: "5px 20px 5px 130px" }}
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

              {isActiveDebounceChildContainer && (
                <div className="header__3rdContainer__debounce__child">
                  <div
                    className="d-flex flex-row justify-content-between align-items-baseline"
                    style={{
                      borderBottom: "1px solid #ddd",
                      marginBottom: "10px",
                    }}
                  >
                    <h6 className="header__3rdContainer__debounce__child__title">
                      Your Searches
                    </h6>
                    <div
                      onClick={() => [
                        setsearchQuery(" "),
                        setisActiveDebounceChildContainer(false),
                      ]}
                      style={{ cursor: "pointer" }}
                    >
                      <MdOutlineCancel size={15} color="#000" />
                    </div>
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
                                    setisActiveDebounceChildContainer(false)
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
                </div>
              )}
            </>
          );
        } catch (error) {
          console.log("Error - ", error.message);
        }
      })()}
    </div>
  );
};

export default DebounceSearch;
