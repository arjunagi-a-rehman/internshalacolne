import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const baseUrl="https://internshala-clone-bacl.vercel.app/"
const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showEmailField, setShowEmailField] = useState(true);
    const [showOtpField, setShowOtpField] = useState(false);
    const [error, setError] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}/generate`, { email });
            if (response.status === 200) {
                setShowEmailField(false);
                setShowOtpField(true);
                setError('');
            }
        } catch (error) {
            setError('Error generating OTP. Please try again.');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}/login`, { email, OTP: otp },{
                withCredentials: true // Allow cookies to be sent with the request
              });
            console.log(response.status);
            if (response.status === 200) {
              const cookieHeader = response.headers['set-cookie'];
              console.log(response.data['token'] ,"coookeis");
              if (cookieHeader) {
                const cookie = cookieHeader.split(';')[0];
                console.log(cookie);
                // Store the cookie in the browser's cookie store
                document.cookie = response.data['token'];
               
              }
              navigate('/');
                setError('');
                // Redirect to dashboard or another page upon successful login
            }
        } catch (error) {
            setError(`Error logging in. Please check your OTP and try again.${error.status}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login Form</h2>
            <form onSubmit={showEmailField ? handleEmailSubmit : handleLoginSubmit}>
                {showEmailField &&
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                }

                {showOtpField &&
                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label">OTP</label>
                        <input type="text" className="form-control" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    </div>
                }

                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default LoginForm;
