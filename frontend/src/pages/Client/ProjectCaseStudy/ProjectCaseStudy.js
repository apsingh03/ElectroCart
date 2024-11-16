import React from "react";
import Header from "../../../components/Client/Header";
import "./ProjectCaseStudy.css";
import AndroidCaseStudy from "./AndroidCaseStudy";
import WebAppCaseStudy from "./WebAppCaseStudy";
import { Link } from "react-router-dom";

const ProjectCaseStudy = () => {
  return (
    <>
      <Header />

      <div className="p-3">
        <div className="caseStudy">
          <div className="caseStudy__firstDiv mt-4">
            <h3>Project Overview</h3>
            <div className="mt-0">
              <ul>
                <li>
                  <b>Title:</b> WearCraft - A Multi-Platform E-Commerce Solution
                </li>
                <li>
                  <b>Subtitle:</b> Comprehensive Web & Mobile E-Commerce
                  Application with Advanced Features
                </li>
                <li>
                  <b>Call-to-Action:</b> Designed for eCommerce customers and
                  business users looking for a seamless and scalable online
                  shopping solution.
                </li>
                <li>
                  <b>Project Overview:</b> WearCraft is a full-featured
                  e-commerce platform built using the MERN stack for the web and
                  React Native for mobile. The solution is designed to offer a
                  consistent, responsive user experience across both platforms.
                </li>
                <li>
                  <b>Tech Stack:</b> HTML, CSS, Bootstrap, JavaScript, React.js,
                  React Native, MySql, Redux, Redux Persist, Socket.io, AWS S3,
                  Razorpay, Formik
                </li>

                <li>
                  <b>Developer Profile :</b>

                  <ul>
                    <li>
                      Name - Ajay Pratap Singh ( Mern Stack & React Native
                      Developer ){" "}
                    </li>
                    <li>Email- apsinghjobs@gmail.com</li>
                    <li>Contact No- +91 7742219565 </li>
                    <li>
                      Website - {"  "}
                      <Link
                        to="https://ajaypratapsingh.online/"
                        target="_blank"
                      >
                        Click Here
                      </Link>
                    </li>
                    <li>
                      Github - {"  "}
                      <Link to="https://github.com/apsingh03" target="_blank">
                        Click Here
                      </Link>
                    </li>
                    <li>
                      Linked In -{"   "}
                      <Link
                        to="https://www.linkedin.com/in/apsingh03/"
                        target="_blank"
                      >
                        Click Here
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className=" d-block  d-md-none d-flex flex-row justify-content-between ">
            <a href="#webAppCaseStudy" className="btn btn-primary btn-sm">
              Click Here For Web App Case Study
            </a>
            <a href="#androidAppCaseStudy" className="btn btn-primary btn-sm">
              Click Here For Android App Case Study
            </a>
          </div>

          <div className="caseStudy__secondDiv row " id="webAppCaseStudy">
            <div className="caseStudy__secondDiv__one col-12 col-md-6 ">
              <div className="caseStudy__secondDiv__one__card">
                <h3 className="text-center">WearKart WebAPP</h3>

                <WebAppCaseStudy />
              </div>
            </div>
            <div
              className="caseStudy__secondDiv__two col-12 col-md-6 "
              id="androidAppCaseStudy"
            >
              <div className="caseStudy__secondDiv__two__card">
                <h3 className="text-center">WearKart Android App</h3>

                <AndroidCaseStudy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCaseStudy;
