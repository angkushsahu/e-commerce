import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import search from "../../Images/search.svg";
import bagFill from "../../Images/bag-fill.svg";
import pbf from "../../Images/person-badge-fill.svg";
import list from "../../Images/list.svg";
import x from "../../Images/x.svg";

export default function Header() {

    const [showNavbar, setShowNavbar] = useState(false);
    const navigate = useNavigate();

  return (
    <header className="header">
        <div className="logo">
            <h2 className="logo_header" onClick={() => navigate("/")}>PACIFIO</h2>
        </div>
        <nav className={showNavbar? "nav right" : "nav"}>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/products")}>Products</li>
            <li onClick={() => navigate("/")}>Contact</li>
            <li onClick={() => navigate("/")}>About</li>
        </nav>
        <div className="user">
            <img src={search} alt="search" onClick={() => navigate("/search")} />
            <img src={bagFill} alt="your products" />
            <img src={pbf} alt="your account" />
        </div>
        <div className="hamburger">
            <img src={list} className={showNavbar? "hamburger_open dNone" : "hamburger_open dShow"} alt="hamburger" onClick={() => setShowNavbar(true)} />
            <img src={x} className={showNavbar? "hamburger_close dShow" : "hamburger_close dNone"} alt="hamburger" onClick={() => setShowNavbar(false)} />
        </div>
    </header>
  )
}