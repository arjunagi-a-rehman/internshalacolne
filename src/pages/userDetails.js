import React, { useState } from 'react';
import axios from 'axios';
const baseUrl="https://internshala-clone-bacl.vercel.app/"

const UserDataForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        profile_pic: '',
        linkedIn_link: '',
        gitHub_link: '',
        resume: '',
        ProjectName: '',
        ProjectDescription: '',
        isSolo: '',
        projectLink: '',
        isInternShip: '',
        companyName: '',
        companyWebsiteLink: '',
        startDate: '',
        endDate: '',
        coverlatter: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${baseUrl}/user/`, cleanUserData(userData),{
                withCredentials: true // Allow cookies to be sent with the request
              });
            console.log(response.data);
            // Reset form after successful submission
            setUserData({
                name: '',
                profile_pic: '',
                linkedIn_link: '',
                gitHub_link: '',
                resume: '',
                ProjectName: '',
                ProjectDescription: '',
                isSolo: '',
                projectLink: '',
                isInternShip: '',
                companyName: '',
                companyWebsiteLink: '',
                startDate: '',
                endDate: '',
                coverlatter: ''
            });
            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data. Please try again.');
        }
    };

    const cleanUserData = (data) => {
        // Remove empty or null fields
        const cleanedData = {};
        for (const key in data) {
            if (data[key] !== '' && data[key] !== null) {
                cleanedData[key] = data[key];
            }
        }
        return cleanedData;
    };

    return (
        <div className="container mt-5">
            <h2>User Data Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Render input fields for each data field */}
                {Object.entries(userData).map(([key, value]) => (
                    <div className="mb-3" key={key}>
                        <label htmlFor={key} className="form-label">{key}</label>
                        <input type="text" className="form-control" id={key} name={key} value={value} onChange={handleChange} />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default UserDataForm;
