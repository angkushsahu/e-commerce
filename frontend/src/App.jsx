import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';
import Header from "./Components/Layout/Header.jsx";
import Footer from "./Components/Layout/Footer.jsx";
import Search from "./Components/Layout/Search.jsx";
// import UserOptions from "./Components/Layout/UserOptions.jsx";
import HomePage from "./Components/Home/HomePage.jsx";
import Products from "./Components/Products/Products.jsx";
import ProductDetails from "./Components/Products/ProductDetails.jsx";
import LoginSignup from "./Components/User/LoginSignup.jsx";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
// import { useSelector } from "react-redux";

export default function App() {

  // const { isAuthenticated, user } = useSelector(state => state.user);

  useEffect(function() {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        {/* { isAuthenticated && <UserOptions user={user} /> } */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/products/:keyword" element={<Products />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
        <Footer />
    </Fragment>
  );
}