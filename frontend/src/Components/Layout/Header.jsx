import "./Header.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions.jsx";
import search from "../../Images/search.svg";
import bagFill from "../../Images/bag-fill.svg";
import pbf from "../../Images/person-badge-fill.svg";
import list from "../../Images/list.svg";
import x from "../../Images/x.svg";

export default function Header() {

    const { isAuthenticated, user } = useSelector(state => state.user);
    const [showNavbar, setShowNavbar] = useState(false);
    const navigate = useNavigate();

    function toggleNavbar() {
        setShowNavbar(!showNavbar);
    }

  return (
    <header className="header">
        <div className="logo">
            <h2 className="logo_header" onClick={() => navigate("/")}>PACIFIO</h2>
        </div>
        <nav className={showNavbar? "nav right" : "nav"}>
            <li onClick={() => { toggleNavbar(); navigate("/"); }}>Home</li>
            <li onClick={() => { toggleNavbar(); navigate("/products"); }}>Products</li>
            <li onClick={() => { toggleNavbar(); navigate("/"); }}>Contact</li>
            <li onClick={() => { toggleNavbar(); navigate("/"); }}>About</li>
        </nav>
        <div className="user">
            <img src={search} alt="search" onClick={() => navigate("/search")} />
            <img src={bagFill} alt="your products" onClick={() => navigate("/products")} />
            { isAuthenticated ? <UserOptions user={user} /> : <img src={pbf} alt="your account" onClick={() => navigate("/login")} /> }
        </div>
        <div className="hamburger">
            <img src={list} className={showNavbar? "hamburger_open dNone" : "hamburger_open dShow"} alt="hamburger" onClick={toggleNavbar} />
            <img src={x} className={showNavbar? "hamburger_close dShow" : "hamburger_close dNone"} alt="hamburger" onClick={toggleNavbar} />
        </div>
    </header>
  )
}