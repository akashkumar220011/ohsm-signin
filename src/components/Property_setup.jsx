import { useState } from "react";
import './Property_setup.css';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import axios from "axios";

const PropertySetup = () => {
    const [busiInfo, setBusiInfo] = useState(true);
    const [formData, setFormData] = useState({
        propertyType: "",
        propertyName: "",
        phoneNumber: "",
        emailAddress: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
        logo: null,
    });
    const [totalSubmit, setTotalSubmit] = useState(null);
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogoChange = (e) => {
        const logoFile = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            logo: logoFile,
        }));
    };
    
    const handleAddInventory = () => {
        // Perform any necessary actions related to adding inventory
        // For example, you can update the totalSubmit state with business info and navigate to the inventory page
        setTotalSubmit({
            formData: { ...formData },
            // inventoryData: /* Add your inventory data here */,
        });
        
    };


    const propertyTypes = ["Residential", "Commercial", "Industrial"]; //  array of property types
    const states = ["Uttrakhand", "Delhi", "Maharashtra"]; //  array of states
    const cities = {
        Uttrakhand: ["Dehradun", "Haridwar", "Rishikesh"],
        Delhi: ["New Delhi", "Old Delhi"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    }; 
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("image", formData.logo);  // Append the logo file to FormData

            // Append other form data
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== "logo") {
                    formDataToSend.append(key, value);
                }
            });

            // Assuming you have a backend endpoint at `${baseUrl}/property-setup`
            const response = await axios.post(`${baseUrl}/property-setup`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Handle success, e.g., navigate to the next page
                navigate('/user/inventory');
            } else {
                // Handle error
                console.error('Failed to send data to the backend');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="property-setup-container">
            <h2>Property Setup</h2>

            <div className="logo-uploader">
                {/* Logo Icon */}
                <span>Logo Icon</span>
                <span>Display Logo</span>
                <input type="file" accept="image/*" onChange={handleLogoChange} />
            </div>

            <form className="property-setup-form">
                <div className="business-info-container">
                    <div className="busines-info-header" onClick={() => { setBusiInfo(!busiInfo) }} >
                        <span>
                            Business Information
                        </span>
                        <span>
                            click me
                        </span>
                    </div>
                    {
                        busiInfo && (
                            <div className="business-info-form">
                                <div className="business-info-form-field">
                                    <label htmlFor="">Property Type</label>
                                    <select
                                    name="propertyType"
                                    id="propertyType"
                                    onChange={handleInputChange}
                                    value={formData.propertyType}
                                >
                                    <option value="" disabled>Select Property Type</option>
                                    {propertyTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">Property Name</label>
                                    <input type="text" placeholder="Property Name" onChange={handleInputChange} />
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">Phone Number</label>
                                    <input type="number" placeholder="Phone Number" onChange={handleInputChange} />
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">Email Address</label>
                                    <input type="email" placeholder="Email Address" onChange={handleInputChange} />
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">Address</label>
                                    <input type="text" placeholder="Address" onChange={handleInputChange} />
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">State</label>
                                    <select
                                    name="state"
                                    id="state"
                                    onChange={handleInputChange}
                                    value={formData.state}
                                >
                                    <option value="" disabled>Select State</option>
                                    {states.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">City</label>
                                    <select
                                    name="city"
                                    id="city"
                                    onChange={handleInputChange}
                                    value={formData.city}
                                >
                                    <option value="" disabled>Select City</option>
                                    {cities[formData.state]?.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                </div>

                                <div className="business-info-form-field">
                                    <label htmlFor="">Pincode</label>
                                    <input type="number" placeholder="e.g. 220011" onChange={handleInputChange} />
                                </div>

                            </div>
                        )
                    }

                </div>

                <div className="add-inventory-cont" onClick={handleAddInventory}>
                    <div className="add-inven-icon">
                    <i className="fa-solid fa-plus"></i>
                    </div>
                    <span>Add Inventory</span>
                </div>


                <button className="business-info-btn" onClick={handleFormSubmit} >Complete your setup</button>
            </form>
        </div>
    )
}

export default PropertySetup;