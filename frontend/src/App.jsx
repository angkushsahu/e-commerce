import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';
import Header from "./Components/Layout/Header.jsx";
import Footer from "./Components/Layout/Footer.jsx";
import Search from "./Components/Layout/Search.jsx";
import HomePage from "./Components/Home/HomePage.jsx";
import Products from "./Components/Products/Products.jsx";
import ProductDetails from "./Components/Products/ProductDetails.jsx";

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/products/:keyword" element={<Products />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
        <Footer />
    </Fragment>
  );
}