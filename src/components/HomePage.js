import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Product from "./Product";
import Cake from "../assets/cake.jpg";

const Homepage = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalSumPrice, setTotalSumPrice] = useState(0);
  const products = [
    {
      id: 1,
      name: "Cake",
      price: "₹220",
      description:
        "Indulge in the heavenly delight of our freshly baked cakes. Our cakes are crafted with love and attention to detail, using the finest ingredients. Moist and flavorful, each slice is a slice of paradise. ",
      image: Cake
    },
    {
      id: 2,
      name: "Pastry",
      price: "₹130",
      description:
        "Experience the artistry of our delicate pastries that are a true feast for the senses. Handcrafted with precision, our pastries are a blend of flaky crusts, luscious fillings, and exquisite flavors. ",
      image: Cake
    },
    {
      id: 3,
      name: "Chocolates",
      price: "₹150",
      image: Cake,
      description:
        "Immerse yourself in the velvety world of chocolate. Our range of chocolates is a paradise for chocolate lovers. From smooth milk chocolates to intense dark chocolates, each piece is a pure delight. Experience the rich, creamy, and luxurious flavors that melt in your mouth, leaving you with a sense of pure bliss. "
    },
    {
      id: 4,
      name: "Chocolava Ice Cream",
      price: "₹180",
      description:
        'Indulge in the ultimate chocolate lover"s dream with our Chocolava Ice Cream. It"s a decadent combination of rich chocolate ice cream swirled with ribbons of luscious chocolate fudge, creating a heavenly symphony of flavors. Each spoonful is a delightful explosion of chocolate goodness, as the smooth and creamy ice cream melts on your tongue.',
      image: Cake
    }
  ];

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const addToCart = (productId) => {
    const product = getProductById(productId);
    setCart([...cart, product]);
  };

  const deleteFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const handleCheckout = () => {
    const totalSum = cart.reduce(
      (sum, item) => sum + Number(item.price.slice(1)),
      0
    );
    setTotalSumPrice(totalSum);
    console.log("Total Sum:", cart, totalSum);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="container">
        <h1 className="title">Bakery Homepage</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/" className="home-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="checkout-link">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="product-list">
                {filteredProducts.map((product) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    image={product.image}
                    addToCart={addToCart}
                    deleteFromCart={deleteFromCart}
                    price={product.price}
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
                {cart.length > 0 ? (
                  <div>
                    <h3>Cart Items:</h3>
                    <ul className="checkout-list">
                      {cart.map((item) => (
                        <li key={item.id}>
                          {item.name} - {item.price}
                        </li>
                      ))}
                    </ul>
                    <button onClick={handleCheckout}>Checkout</button>
                  </div>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Homepage;
