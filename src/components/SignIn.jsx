import React, { useState } from "react";
import '../SignIn.css'
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import axios from "axios";
import { useAuth } from "../contexts/Auth_Context";

function SignIn() {
    const navigate = useNavigate()
    const [ auth, setAuth] = useAuth()
    const [userData, setUserData] = useState({ 
        email: "",
        password: "",
    })
    const handleInputChange = (e, fieldName) => {
        const value = e.target.value;

        setUserData(prevUserData => ({
            ...prevUserData,
            [fieldName]: value
        }));
    }

    const handleformSubmission = async (e) => {
        e.preventDefault()
        try {
            console.log("Url", baseUrl);
            const res = await axios.post(`${baseUrl}/signin`, userData)

            if (res.status === 201) {
                console.log("Response:", res);
                alert("Sign in Success!")
                setAuth({...auth, user: res.data.user, token: res.data.token
                })
                localStorage.setItem( "auth", JSON.stringify(res.data));
                navigate('/user/property-setup')
            }
            
        } catch (error) {
            console.log("error:", error);
            alert("Error Signing In! Please Try Again After Some time!")
        }
    }

    return (
        <div className="signin-container">
            <div className="logo">
                {/* add Icon when need */}
                <span className="logo-icon"></span>
                <span className="logo-name">OHSM</span>
            </div>

            <h2 className="signIn-page-heading">Sign In to OHSM</h2>
            <form className="signIn-form">
                <div className="input-field">
                    <label htmlFor="">Email</label>
                    <input id="" type="email" placeholder="Username or Email" required onChange={(e)=>{handleInputChange(e, 'email')}}/>
                </div>

                <div className="input-field">
                    <label htmlFor="">Password</label>
                    <input id="" type="password" placeholder="Password" required onChange={(e) => handleInputChange(e, 'password')} />
                </div>

                <p className="forgot-password"><a href="#">Forgot password</a></p>

                <button className="form-btn" type="submit" onClick={
                   handleformSubmission
                }>Sign In</button>

                <div className="seperator">
                    <p className="left-bar"></p> 
                    <p className="seperator-text">or continue with</p>
                     <p className="right-bar"></p>
                </div>
                <button className="social-auth-btn">
                    <span>google</span>
                    <span> Continue With Google</span>
                </button>
            </form>

            {/* <p>Don't have an account? <Link to="/sign-up">Sign Up</Link> </p> */}
            <p className="dontHaveAccount">Don't have an account? <Link to="/sign-up">Sign Up</Link> </p>
        </div>
    )
}
export default SignIn;
