import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Product = ({ id, name, description, addToCart, deleteFromCart }) => {
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
      <h2>{name}</h2>
      <p>{description}</p>
      <button onClick={() => addToCart(id)}>Add to Cart</button>
      <button onClick={() => deleteFromCart(id)}>Delete from Cart</button>
    </div>
  );
};

const Homepage = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    const product = getProductById(productId);
    setCart([...cart, product]);
  };

  const deleteFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of Product 1"
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of Product 2"
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of Product 3"
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description of Product 4"
    }
  ];

  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const handleCheckout = () => {
    console.log("Cart:", cart);
  };

  return (
    <Router>
      <div>
        <h1>Bakery Homepage</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="product-list">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    addToCart={addToCart}
                    deleteFromCart={deleteFromCart}
                  />
                ))}
              </div>
            }
          />
          <Route
            path="/checkout"
            element={
              <div>
                <h2>Checkout</h2>
                {cart.map((product) => (
                  <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                ))}
                <button onClick={handleCheckout}>Checkout</button>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Homepage;
