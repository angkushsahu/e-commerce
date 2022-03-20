import "./Products.scss";

import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import { clearErrors, getProduct } from "../../actions/productAction.js";
import Product from "./Product.jsx";

const categories = [
  "Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones"
];

export default function Products() {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
  let { keyword } = useParams();

  const priceHandler = (e, newPrice) => setPrice(newPrice);
  const setCurrentPageNumber = e => setCurrentPage(e);

  let count = filteredProductsCount;

  useEffect(function() {

    window.scrollTo(0, 0);

    if (error) {
      toast.error(error, {
        position: "top-center",
				style: { backgroundColor: "#191919" }
			});

      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);

  return (
    <Fragment>
      <div className="products_container">

      <div className="filterBox">
            <Typography className="filterBox_price">Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <section className="categories">
              <Typography className="filterBox_categories">Categories</Typography>
              <ul className="categoryBox">
                {categories.map(category => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </section>

            <fieldset className="ratings">
              <Typography component="legend" className="filterBox_ratings">Ratings above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby="continuous-slider"
                min={0} max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>

          </div>
      {
        loading?
        (
          <Loader />
        ) :
        (
          <div className="products">
            {
              products &&
              products.map(product => <Product key={product._id} product={product} />)
            }
          </div>
        )
      }
    </div>

          {
            (count && resultPerPage <= count) && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNumber}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
              )
          }
      <ToastContainer />
    </Fragment>
  )
}