import React from "react";

import { BiSupport } from "react-icons/bi";
import { IoIosGift } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoRocketOutline } from "react-icons/io5";

const FooterServiceOffering = () => {
  return (
    <div className="fSOffering">
      <div className="fSOffering__box">
        <div className="fSOffering__box__icon">
          {" "}
          <IoRocketOutline />{" "}
        </div>
        <p className="fSOffering__box__1stTitle">Free Delivery </p>
        <p className="fSOffering__box__2ndTitle">
          For all orders above &#x20B9; 5000{" "}
        </p>
      </div>
      <div className="fSOffering__box">
        <div className="fSOffering__box__icon">
          <FaRegCreditCard />
        </div>
        <p className="fSOffering__box__1stTitle">Secure Payment </p>
        <p className="fSOffering__box__2ndTitle">100% secure payment</p>
      </div>
      <div className="fSOffering__box">
        <div className="fSOffering__box__icon">
          <BiSupport />
        </div>
        <p className="fSOffering__box__1stTitle">24 / 7 Support </p>
        <p className="fSOffering__box__2ndTitle">Dedicated Support</p>
      </div>
      <div className="fSOffering__box">
        <div className="fSOffering__box__icon">
          <IoIosGift />
        </div>
        <p className="fSOffering__box__1stTitle">Exclusive Offers </p>
        <p className="fSOffering__box__2ndTitle">On top Brands</p>
      </div>
    </div>
  );
};

export default FooterServiceOffering;
