import React, { useEffect, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import {
  deleteUserFavoriteProductAsync,
  getUserFavoriteProductAsync,
} from "../../Redux/UserSlices/FavoriteProduct/FavoriteProductSlice";
import { calculateProductDiscount } from "../../utils/productDiscountCalculate";
import { Link } from "react-router-dom";

const WishList = () => {
  const dispatch = useDispatch();

  const user_favoriteProductRedux = useSelector(
    (state) => state.user_favoriteProduct.data?.query
  );

  //   console.log("user_favoriteProductRedux - ", user_favoriteProductRedux);

  const { setisLoadingTopProgress, isLoadingWishList, setisLoadingWishList } =
    useContext(AppContext);

  async function fetchData() {
    setisLoadingTopProgress(30);

    await dispatch(getUserFavoriteProductAsync());

    setisLoadingTopProgress(100);
  }

  async function handleRemoveBtn(id) {
    setisLoadingWishList(true);

    const actionResult = await dispatch(
      deleteUserFavoriteProductAsync({ wishList_id: id })
    );

    if (actionResult.payload?.msg === "success") {
      setisLoadingWishList(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="wishlistContainer">
        <h4 className="text-center mb-3">Your Wishlist</h4>

        <div className="wishlist">
          {user_favoriteProductRedux &&
            user_favoriteProductRedux.map((wishList, idx) => {
              const sortedProductSizes = [
                ...(wishList?.productUserFavoriteProduct?.productSizesProduct ||
                  []),
              ].sort((a, b) => a.mrp - b.mrp);
              return (
                <div className="wishlist__card" key={idx}>
                  <div
                    className="wishlist__card__deleteIcon"
                    onClick={() => handleRemoveBtn(wishList?.id)}
                  >
                    {isLoadingWishList ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      ></div>
                    ) : (
                      <MdDeleteOutline size={20} color="#000" />
                    )}
                  </div>
                  <div>
                    <img
                      className="wishlist__card__image"
                      src={
                        wishList?.productUserFavoriteProduct?.productImage?.url1
                      }
                      alt="sadasdads"
                    />
                  </div>

                  <div className="wishlist__card__product">
                    <p className="wishlist__card__product__name">
                      {wishList?.productUserFavoriteProduct &&
                        wishList?.productUserFavoriteProduct.name}
                    </p>
                    <p className="wishlist__card__product__price">
                      {calculateProductDiscount(
                        sortedProductSizes[0]?.mrp,
                        sortedProductSizes[0]?.discountPercent
                      )}
                    </p>
                  </div>

                  <div className="wishlist__card__btn">
                    <Link
                      to={`/product/category/${wishList?.product_id}/${wishList?.productUserFavoriteProduct?.name}`}
                      style={{ color: "#fff", textDecoration: "none" }}
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
