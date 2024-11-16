import React, { useState } from "react";
import { calculateProductDiscount } from "../../../utils/productDiscountCalculate";
import { Link } from "react-router-dom";

const ProductCard = ({ product, title }) => {
  // console.log("product- ", product);
  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <Link
          to={`/product/${product?.productCategory?.name}/${product?.id}/${product?.name}`}
        >
          <img
            src={product?.productImage?.url1}
            alt={product?.name}
            className="product-card__image"
          />{" "}
        </Link>

        {product?.productSizesProduct?.discountPercent && (
          <span className="product-card__discount">
            {product?.productSizesProduct?.discountPercent}
          </span>
        )}
      </div>
      <div className="product-card__info">
        <span className="product-card__category  ">
          {product?.productCategory?.name}
        </span>
        <h3 className="product-card__title  text-two-lines">{product?.name}</h3>
        <p className="product-card__storage">
          {product?.productSizesProduct[0]?.pSizeProductSizes?.name}
        </p>
        <div className="product-card__price">
          <span className="product-card__price-current">
            {product.price}
            {calculateProductDiscount(
              product?.productSizesProduct[0]?.mrp,
              product?.productSizesProduct[0]?.discountPercent
            )}
          </span>
          {product.originalPrice && (
            <span className="product-card__price-original">
              {product?.productSizesProduct?.mrp}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
