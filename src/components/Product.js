import React, { useState } from "react";

function Product({
  id,
  name,
  description,
  addToCart,
  deleteFromCart,
  image,
  price
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`product ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className="product-image" src={image} alt={name} />
      <h2 className="product-name">{name}</h2>
      <p className="product-price">{price}</p>

      <p className="product-description">{description}</p>
      <button className="add-to-cart-btn" onClick={() => addToCart(id)}>
        Add to Cart
      </button>
      <button
        className="delete-from-cart-btn"
        onClick={() => deleteFromCart(id)}
      >
        Delete from Cart
      </button>
    </div>
  );
}

export default Product;
