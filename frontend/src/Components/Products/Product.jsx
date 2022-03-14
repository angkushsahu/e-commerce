import "./Product.scss";
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

export default function Product({ product }) {

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true
  };

  return (
    <Link className="card" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} className="card_image" />
        <p className="card_title">{product.name}</p>
          <div className="ratings">
            <ReactStars {...options} />
            <span>({product.numberOfReviews} {product.numberOfReviews <= 1 ? "Review" : "Reviews"})</span>
          </div>
        <p className="price">&#8377; {product.price}</p>
    </Link>
  )
}