import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { FaSquarePhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="col-12 row">
        <div className="col-6 col-md-2 order-3 order-md-1 ">
          <div className="footer__1st">
            <div>
              <h2 className="footer__1st__title">Navigation</h2>
            </div>
            <div className="footer__1st__links">
              <p>
                {" "}
                <Link className="footer__1st__links__title">About Us</Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Contact Us
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Our Store
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">Blogs</Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">SiteMap</Link>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-2  order-2 order-md-2 ">
          <div className="footer__1st">
            <div>
              <h2 className="footer__1st__title">Categories</h2>
            </div>
            <div className="footer__1st__links">
              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Smart Phone
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Accessories
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">Laptops</Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">TV's</Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">Tablets</Link>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-2  order-4 order-md-3  ">
          <div className="footer__1st">
            <div>
              <h2 className="footer__1st__title">Other Pages</h2>
            </div>
            <div className="footer__1st__links">
              <p>
                {" "}
                <Link className="footer__1st__links__title">FAQs</Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Privacy Policy
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Shipping Policy
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Return & Exchange Policy
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Terms & Conditions
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-2  order-4 order-md-3  ">
          <div className="footer__1st">
            <div>
              <h2 className="footer__1st__title">Best Deals</h2>
            </div>
            <div className="footer__1st__links">
              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Super Deals
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Best SellingProducts
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Exclusive Offers
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-2  order-4 order-md-3  ">
          <div className="footer__1st">
            <div>
              <h2 className="footer__1st__title">Best Deals</h2>
            </div>
            <div className="footer__1st__links">
              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Super Deals
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Best SellingProducts
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Exclusive Offers
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-2  order-4 order-md-3  ">
          <div className="footer__1st">
            <div>
              <h2 className="footer__1st__title">Available On</h2>
            </div>
            <div className="footer__1st__links">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                width={"150px"}
                height={"auto"}
                alt="available on playstore"
                className="footer__1st__links__playstore"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="footer__2ndbox d-none d-md-block ">
        <div className="footer__2ndbox__wrapper">
          <div className="footer__2ndbox__box__box">
            <span className="footer__2ndbox__box__box__icon">
              <FaFacebookF />
            </span>
            <span className="footer__2ndbox__box__box__titie">facebook</span>
          </div>
          <div className="footer__2ndbox__box__box">
            <span className="footer__2ndbox__box__box__icon">
              <FaTwitter />
            </span>
            <span className="footer__2ndbox__box__box__titie">Twitter</span>
          </div>
          <div className="footer__2ndbox__box__box">
            <span className="footer__2ndbox__box__box__icon">
              <FaLinkedinIn />
            </span>
            <span className="footer__2ndbox__box__box__titie">Linked In</span>
          </div>
          <div className="footer__2ndbox__box__box">
            <span className="footer__2ndbox__box__box__icon">
              <FaInstagram />
            </span>
            <span className="footer__2ndbox__box__box__titie">Instagram</span>
          </div>
          <div className="footer__2ndbox__box__box">
            <span className="footer__2ndbox__box__box__icon">
              {" "}
              <FaYoutube />{" "}
            </span>
            <span className="footer__2ndbox__box__box__titie">Youtube</span>
          </div>
        </div>
      </div>

      <div className="footer__3rdbox">
        <div className="row">
          <div className="col-12 mb-4 col-md-4  ">
            <div className="d-flex flex-row gap-3">
              <div className="footer__3rdbox__phoneIcon">
                <FaSquarePhone
                  color="#1976D2"
                  size={60}
                  enableBackground={false}
                />
              </div>
              <div className="footer__3rdbox__text">
                <h2 className="footer__3rdbox__text__1">
                  NEED HELP? CALL US: XXX XXX XXX
                </h2>
                <p className="footer__3rdbox__text__2">
                  Avialable timing form Monday - Sunday
                </p>
                <p className="footer__3rdbox__text__3">(10 AM - 7 PM) IST</p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4  ">
            <h2 className="footer__3rdbox__title">Payment Options</h2>
            <img
              src="https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/dfbe2f5f-3151-4362-a87d-be59f0981179.webp"
              width={"100%"}
              height={"auto"}
              alt="Payment Options"
              loading="lazy"
            />
          </div>

          <div className="col-6 col-md-4 ">
            <h2 className="footer__3rdbox__title"> Payment Options</h2>
            <img
              src="https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/3cbdd653-e830-4768-b52a-bda047a2a6fa.png"
              width={"100%"}
              height={"auto"}
              alt="Payment Options"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="footer__4thbox">
        <div className=" footer__4thbox__wrapper ">
          <div>
            <h2 className="footer__4thbox__brandName">ElectroCart</h2>
          </div>

          <div>
            <p className="footer__4thbox__copyright">
              Copyright © 2024 ElectroCart . All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
