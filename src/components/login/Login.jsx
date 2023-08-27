// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../StateContext";

const Login = () => {
    const navigate = useNavigate();
    const { setuser } = useGlobalContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("username");
        const storedRememberMe = localStorage.getItem("checkbox");

        if (storedRememberMe === "true") {
            setRememberMe(true);
            setEmail(storedEmail || "");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('https://richpanel-ankit-nit-assessment-backend.onrender.com/signIn', { email, password })
        console.log(data);
        if (data.status == 400) {
            alert(data.msg)
        }
        if (data.status == 500) {
            alert(data.msg)
        }
        if (data.status == 200) {
            console.log(data.user, "datauser");
            setuser(data.user)
            if (rememberMe) {
                localStorage.setItem("username", email);
                localStorage.setItem("checkbox", "true");
            } else {
                localStorage.removeItem("username");
                localStorage.removeItem("checkbox");
            }
            navigate('/Plan')
        }
    };

    return (
        <>
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="login_head">
                        Login to your account
                    </div>
                    <form className="login_form">
                        <div className="login_form_in">
                            <label htmlFor="email" className="login_label">Email</label>
                            <input type="email" id="email" className="login_input1" placeholder="manoj@richpanel.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="login_form_in">
                            <label htmlFor="pass" className="login_label">Password</label>
                            <input type="password" placeholder=".............." id="pass" className="login_input2" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="login_form_rem">
                            <input
                                className="login_form_rem_box"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label className="login_form_rem_label" htmlFor="rememberMe">Remember Me</label>
                        </div>

                        <input
                            className="login_form_login"
                            type="submit"
                            value="Login"
                            id="signUpButton"
                            onClick={(e) => handleLogin(e)}
                        />
                    </form>
                    <div className="login_bottom">
                        New to MyApp? {" "}
                        <div className="login_bottom_sign" onClick={() => navigate("/")}>Sign Up</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login