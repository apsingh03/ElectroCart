import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const DealsSection = () => {
  const dataArray = [
    {
      id: 1,
      imgLink:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/tablet/o/w/l/-original-imah4rktzgmeqjak.jpeg?q=70&crop=false",
      imgAlt: "Tablets",
      title: "Tablets",
      routeLink: "/collections?filter.category=Tablet",
    },
    {
      id: 2,
      imgLink:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/w/3/4/-original-imahyytukhkky5ew.jpeg?q=70&crop=false",
      imgAlt: "Mobiles Phones",
      title: "Mobiles",
      routeLink: "/collections?filter.category=Mobile",
    },
    {
      id: 3,
      imgLink:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/television/t/s/6/ua32t4110arxxl-ua32t4110arxxl-samsung-original-imagmmuzw2fxtztm.jpeg?q=70&crop=false",
      imgAlt: "Tv's ",
      title: "Tv's",
      routeLink: "/collections?filter.category=Tv's",
    },
    {
      id: 4,
      imgLink: "https://thumbs.dreamstime.com/b/mobile-devices-27052796.jpg",
      imgAlt: "All Accessories",
      title: "All",
      routeLink: "/collections",
    },
  ];

  return (
    <div className=" dealsSection">
      <div className="col-12 row">
        {dataArray.map((data, idx) => {
          return (
            <div className="col-6 col-md-3 mb-3 mb-md-0" key={idx}>
              <div className="dealsSection__item">
                <div className="dealsSection__item__left">
                  <img
                    src={data.imgLink}
                    alt={data.imgAlt}
                    className="dealsSection__item__left__image"
                    loading="lazy"
                  />
                </div>

                <div className="dealsSection__item__right">
                  <h3 className="dealsSection__item__right__title">
                    {data.title}
                  </h3>
                  <Link
                    to={data.routeLink}
                    className="dealsSection__item__right__link"
                  >
                    Shop Now <FaAngleRight size={15} color="#000" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DealsSection;
