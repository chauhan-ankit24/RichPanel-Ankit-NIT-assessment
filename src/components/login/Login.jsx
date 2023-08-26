// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../StateContext";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const { setuser } = useGlobalContext();

    useEffect(() => {
        const storedEmail = localStorage.getItem("username");
        const storedRememberMe = localStorage.getItem("checkbox");

        if (storedRememberMe === "true") {
            setRememberMe(true);
            setEmail(storedEmail || "");
        }
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('http://localhost:3000/signIn', { email, password })
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
            navigate('/CurrentPlan')
            // navigate('/Plan')
        }
    };

    return (
        <>
            <div className="SignIn-wrapper">
                <div className="signin-container">
                    <h2>Login to your account</h2>
                    <form>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="pass">Password</label>
                            <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="div2">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>

                        <input
                            type="submit"
                            value="Login"
                            id="signUpButton"
                            onClick={(e) => handleSignIn(e)}
                        />
                    </form>
                    <p>
                        New to MyApp?{" "}
                        <span onClick={() => navigate("/")}>Sign Up</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login