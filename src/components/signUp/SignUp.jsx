// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "../login/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
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

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://richpanel-ankit-nit-assessment-backend.onrender.com/signUp", {
                name,
                email,
                password,
            });
            console.log("Sign up successful", response.data);

            if (rememberMe) {
                localStorage.setItem("username", email);
                localStorage.setItem("checkbox", "true");
            } else {
                localStorage.removeItem("username");
                localStorage.removeItem("checkbox");
            }

            navigate("/Login");
        } catch (error) {
            console.error("Sign up failed", error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container2">
                <div className="login_head">
                    Create Account
                </div>
                <form className="login_form" onSubmit={handleSignUp}>
                    <div className="login_form_in">
                        <label className="login_label" htmlFor="text">Name</label>
                        <input
                            placeholder="Manoj Kumar"
                            className="login_input1"
                            type="text"
                            id="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="login_form_in">
                        <label className="login_label" htmlFor="email">Email</label>
                        <input
                            placeholder="manoj@richpanel.com"
                            className="login_input1"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login_form_in">
                        <label className="login_label" htmlFor="pass">Password</label>
                        <input
                            placeholder=".............."
                            className="login_input2"
                            type="password"
                            id="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="login_form_rem">
                        <input
                            className="login_form_rem_box"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="login_form_rem_label" htmlFor="rememberMe">Remember me</label>
                    </div>

                    <input className="login_form_login" type="submit" value="Sign Up" id="signUpButton" />
                </form>
                <div className="login_bottom">
                    Already have an account?{" "}
                    <div className="login_bottom_sign" onClick={() => navigate("/Login")}>Login</div>
                </div>
            </div>
        </div>
    );
};

export default SignUp
