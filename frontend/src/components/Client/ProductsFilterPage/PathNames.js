import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const PathNames = ({
  clientGetProductFiltersAsync,
  clientGetSizesFiltersAsync,
  clientAllListedProductsAsync,
  clientShowFilteredProductsAsync,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [pathNames, setPathNames] = useState([]);
  const { setisLoadingTopProgress } = useContext(AppContext);

  // Function to handle removing a path segment
  const handleRemove = (index) => {
    // Filter out the clicked path segment
    const updatedPathNames = pathNames.filter((_, idx) => idx !== index);
    setPathNames(updatedPathNames);
    // Update the location.pathname
    window.history.pushState({}, "", "/" + updatedPathNames.join("/"));
  };

  useEffect(() => {
    // Split the pathname and remove the first two segments
    const initialPathNames = window.location.pathname.split("/").slice(2);
    setPathNames(initialPathNames);
  }, []);

  return (
    <>
      {(function () {
        try {
          return pathNames.map((data, idx) => {
            return (
              <div key={idx} className="pFilterPage__left__pathNames__wrapper">
                <p className="pFilterPage__left__pathNames__wrapper__text">
                  {" "}
                  {data}{" "}
                </p>
                <span
                  className="pFilterPage__left__pathNames__wrapper__icon"
                  onClick={() => handleRemove(idx)}
                >
                  &#10006;
                </span>{" "}
              </div>
            );
          });
        } catch (error) {
          console.log("Error - ", error.message);
        }
      })()}
    </>
  );
};

export default PathNames;
