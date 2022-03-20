import "./LoginSignup.scss";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";

import { clearErrors, login, register } from "../../actions/userAction.js";
import Loader from "../Layout/Loader";

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error, loading, isAuthenticated} = useSelector(state => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "", email: "", password: ""
    });
    const { name, email, password } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/profile.svg");

    function loginSubmit(event) {

        event.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    function registerSubmit(event) {

        event.preventDefault();

        user.avatar = avatar;

        dispatch(register(user));
    }

    function registerDataChange(event) {
        if (event.target.name === "avatar") {
            const reader = new FileReader();

            reader.onloadend = function() {
                if (reader.readyState === 2) {
                    const something = reader.result;
                    setAvatarPreview(something);
                    setAvatar(something);
                    console.log(event.target.files[0]);
                }
            }
            reader.readAsDataURL(event.target.files[0]);
        } else {
            setUser({ ...user, [event.target.name]: event.target.value });
        }
    }

    useEffect(function() {
        if (error) {
            toast.error(error, {
                position: "top-center",
                style: { backgroundColor: "#191919" }
            });

            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate("/account");
        }
    }, [navigate, dispatch, error, isAuthenticated]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.remove("shiftToNeutral");
            switcherTab.current.classList.add("shiftToRight");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    return (
        <div className="LoginSignup">
            {
                loading ?
                <Loader /> :
                <div className="LoginSignup_box">
                    <div>
                        <div className="login_signup_toggle">
                            <p onClick={e => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={e => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className="login_form" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="email"
                                required
                                value={loginEmail}
                                onChange={e => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="password"
                                required
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forgot password</Link>
                        <input type="submit" className="login_button" value="Login" />
                    </form>
                    <form
                        className="signup_form"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signup_name">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                name="name"
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signup_email">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="E-mail"
                                required
                                value={email}
                                name="email"
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signup_password">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                name="password"
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="register_image">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Register"
                            className="signup_button"
                            disabled={loading ? true : false}
                        />
                    </form>
                </div>
            }
            <ToastContainer />
        </div>
    );
}