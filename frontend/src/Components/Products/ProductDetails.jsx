import "./ProductDetails.scss";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../Layout/Loader.jsx";
import ReviewCard from "./ReviewCard.jsx";

export default function ProductDetails() {
	const dispatch = useDispatch();
	const { product, loading, error } = useSelector(state => state.productDetails);

	const { id } = useParams();

	useEffect(() => {
		if (error) {
			toast.error(error, {
				position: "top-center",
				style: { backgroundColor: "#191919" }
			});
			dispatch(clearErrors());
		}
		dispatch(getProductDetails(id));
	}, [dispatch, id, error]);

	const options = {
		edit: false,
		color: "rgba(20, 20, 20, 0.1)",
		activeColor: "tomato",
		size: window.innerWidth < 600 ? 20 : 25,
		value: product.ratings,
		isHalf: true,
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="productDetails">
						<section className="productDetails_1">
							<Carousel>
								{product.images &&
									product.images.map((item, i) => (
										<img
											key={item.url}
											src={item.url}
											alt={`${i}-slide`}
											className="CarouselImage"
										/>
									))}
							</Carousel>
						</section>
						<section className="productDetails_2">
							<div className="detailsBlock_1">
								<h2>{product.name}</h2>
								<p>Product &#35;{product._id}</p>
							</div>
							<div className="detailsBlock_2">
								<ReactStars {...options} />
								<span>&nbsp;&nbsp;({product.numberOfReviews} Reviews)</span>
							</div>
							<div className="detailsBlock_3">
								<h1>{`₹ ${product.price}`}</h1>
								<div className="detailsBlock_3__1">
									<div className="detailsBlock_3__1__1">
										<button>-</button>
										<input type="number" value="1" />
										<button>+</button>
									</div>
									<button>Add to Cart</button>
								</div>
								<p>
									Status:&nbsp;&nbsp;
									<b className={product.Stock < 1 ? "redColor" : "greenColor"}>
										{product.Stock < 1 ? "Out of stock" : "In stock"}
									</b>
								</p>
							</div>
							<div className="detailsBlock_4">
								Description: <p>{product.description}</p>
							</div>
							<button className="submitReview">Submit Review</button>
						</section>
					</div>
					<h3 className="reviewsHeading">REVIEWS</h3>
					{product.reviews && product.reviews[0] ? (
						<div className="reviews">
							{product.reviews &&
								product.reviews.map(review => <ReviewCard review={review} />)}
						</div>
					) : (
						<p className="noReviews">No reviews yet</p>
					)}
          <ToastContainer />
				</>
			)}
      <ToastContainer />
		</>
	);
}
