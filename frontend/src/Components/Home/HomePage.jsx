import { useNavigate } from "react-router-dom";

import "./HomePage.scss";
import MetaData from "../Layout/MetaData.jsx";

import pageTwo from "../../Images/page_two.png";

export default function AuthFirstPage() {

  const navigate = useNavigate();
  const user = "user";

  return (
    <section className="auth_page_body">
        <MetaData title="PACIFIO" />
        <div className="auth_page_body_cone">
            <p className="auth_page_body_cone__title">Hello {user}</p>
            <p className="auth_page_body_cone__description">Upto 30% to 40% off on all products</p>
            <button className="go_to_products" onClick={() => navigate("/products")}>See all products</button>
        </div>
        <div className="auth_page_body_ctwo">
            <img src={pageTwo} alt="background" />
        </div>
    </section>
  )
}