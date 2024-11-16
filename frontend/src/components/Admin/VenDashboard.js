import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VenDashboard = (props) => {
  const [vendorCounting, setvendorCounting] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {}, []);

  // console.log( props )
  return (
    <>
      <div id="adminRightSideWrapper" className="py-2">
        <h1 className="mt-4">Dashboard</h1>
        <ol className="breadcrumb mb-4">
          {/* <li className="breadcrumb-item active">Dashboard</li> */}
        </ol>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                Category
                <b>
                  -{" "}
                  {/* {getCategoryFromRedux &&
                  Object.keys(getCategoryFromRedux).length} */}
                </b>
              </div>

              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="/adminPanel/category"
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                Sub Category
                <b>
                  -{" "}
                  {/* {getSubCategoryFromRedux &&
                  Object.keys(getSubCategoryFromRedux).length} */}
                </b>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="/adminPanel/subCategory"
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                Featured Blogs
                {/* <b>- {isFeaturedBlogs && Object.keys(isFeaturedBlogs).length}</b> */}
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="/adminPanel/subCategory"
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                Un Published Blogs
                <b>
                  {/* - {unPublishedBlogs && Object.keys(unPublishedBlogs).length} */}
                </b>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="/adminPanel/allBlogs"
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                Published Blogs
                {/* <b>- {publishedBlogs && Object.keys(publishedBlogs).length}</b> */}
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="/adminPanel/allBlogs"
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                Deleted Blogs
                {/* <b>- {recycleBlogs && Object.keys(recycleBlogs).length}</b> */}
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="/adminPanel/recycleBin"
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenDashboard;
