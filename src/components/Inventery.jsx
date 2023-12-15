import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import axios from "axios";
import './inventery.css'
function Invertery() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    propertySpaceName: "",
    propertyInventoryType: "",
    otherPropertyType: "",
    capacity: "",
    amenities: "",
    availabilityStatus: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    // Clear form data
    setFormData({
      propertySpaceName: "",
      propertyInventoryType: "",
      otherPropertyType: "",
      capacity: "",
      amenities: "",
      availabilityStatus: "",
      notes: "",
    });

    // Navigate to Property Setup
    navigate('/user/property-setup');
  };

  const handleSave = async () => {
    try {
      // Assuming you have a backend endpoint at `${baseUrl}/save-inventory`
      const response = await axios.post(`${baseUrl}/save-inventory`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Handle success, e.g., show a success message
        console.log('Inventory data saved successfully');

        // Redirect to Property Setup page
        navigate('/user/property-setup');
      } else {
        // Handle error
        console.error('Failed to save inventory data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-heading">Inventory</h2>
      <form className="inventory-form">
        <div className="input-field">
          <label htmlFor="">Property Space Name</label>
          <input type="text" placeholder="Dormitory - 201" required  onChange={handleInputChange}/>
        </div>
        <div className="input-field">
          <label htmlFor="">Property Inventory Type</label>
          <select id="propertyInventoryType" name="propertyInventoryType" onChange={handleInputChange} required>
            <option value="" disabled selected>Select an option</option>
            <option value="Dormitory-201">Dormitory - 201</option>
            <option value="AnotherOption">Other</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="">Other Property Inventory Type</label>
          <input type="text" placeholder="Add Property Inventory Type" onChange={handleInputChange} required />
        </div>
        <div className="input-field">
          <label htmlFor="">Capacity</label>
          <input type="text" placeholder="Number of occupants" onChange={handleInputChange} required />
        </div>
        <div className="input-field">
          <label htmlFor="">Amenities</label>
          <input type="text" placeholder="Available amenities" onChange={handleInputChange} required />
        </div>
        <div className="input-field">
          <label htmlFor="">Availability Status</label>
          <select id="propertyInventoryType" name="propertyInventoryType" onChange={handleInputChange} required>
            <option value="" disabled selected>Select an option</option>
            <option value="Dormitory-201">Active</option>
            <option value="AnotherOption">Other</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="">Notes (if any)</label>
          <input type="text" placeholder="Add notes if any..." onChange={handleInputChange} required />
        </div>
        <button className="cancel-btn"  onClick={handleCancel}>Cancel</button>
        <button className="save-btn"  onClick={handleSave}>Save</button>

      </form>
    </div>
  )
}

export default Invertery;