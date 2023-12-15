import React, { useState } from "react";
import './Signup.css';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import axios from "axios";

function SignUp() {
    const navigate = useNavigate();
    // states to store data
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        receiveEmails: false
    })

    const handleformSubmission = async () => {
        try {
            console.log("Url", baseUrl);
            const res = await axios.post(`${baseUrl}/signup`, userData)

            if (res.status === 201) {
                alert("Sign Up Success!")
                navigate('/sign-in')
                return;
            }
            
        } catch (error) {
            console.log("error:", error);
            if(error.response.status === 409){
                alert("User ALready exists With this Email!")
                navigate('/sign-in')
                return;
            }
            alert("Error Signing In! Please Try Again After Some time!")
        }
    }

    const handleInputChange = (e, fieldName) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setUserData(prevUserData => ({
            ...prevUserData,
            [fieldName]: value
        }));
    }

    return (
        <div className="signup-container">
            <div className="logo">
                {/* add Icon when need */}
                <span className="logo-icon"></span>
                <span className="logo-name">OHSM</span>
            </div>
            <h2 className="signup-page-heading">Create an account</h2>
            <form className="signUp-form">
                <div className="input-field">
                    <label htmlFor="">Full Name</label>
                    <input id="" type="text" placeholder="Full Name" required onChange={(e) => handleInputChange(e, 'fullName')} />
                </div>
                <div className="input-field">
                    <label htmlFor="">Email</label>
                    <input id="" type="text" placeholder="Username or Email" required onChange={(e) => handleInputChange(e, 'email')} />
                </div>

                <div className="input-field">
                    <label htmlFor="">Password</label>
                    <input id="" type="password" placeholder="Password" required onChange={(e) => handleInputChange(e, 'password')} />
                </div>
                <div className="input-field">
                    <label htmlFor="">Confirm Password</label>
                    <input id="" type="password" placeholder="Confirm Password" required onChange={(e) => handleInputChange(e, 'confirmPassword')} />
                </div>
                <div className="checkboxxx">
                    <div className="reciveEmail">
                        <input type="checkbox" onChange={(e) => handleInputChange(e, 'receiveEmails')} />
                        <span>Yes, I want to receive email</span>
                    </div>
                    <div className="reciveEmail">
                        <input type="checkbox" required />
                        <span>I agree to all terms and conditions</span>
                    </div>
                </div>
                <button className="form-btn" type="button" onClick={handleformSubmission}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;
