import "./Products.scss";

import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "react-js-pagination";
import "react-toastify/dist/ReactToastify.css";

import { clearErrors, getProduct } from "../../actions/productAction.js";
import Product from "./Product.jsx";

export default function Products() {

  let { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resultPerPage } = useSelector(state => state.products);
  console.log(`resultPerPage: ${resultPerPage}`);

  const setCurrentPageNumber = e => {
    console.log(`e: ${e}`)
    setCurrentPage(e);
  };

  useEffect(function() {

    if (error) {
      toast.error(error, {
				position: "top-center",
				style: { backgroundColor: "#191919" }
			});
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, error, keyword, currentPage]);

  return (
    <Fragment>
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

          {
            (resultPerPage < productsCount) && (
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