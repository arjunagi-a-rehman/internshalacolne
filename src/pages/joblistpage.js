import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const baseUrl="http://localhost:3000"
const JobList = () => {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('https://himalayas.app/jobs/api?limit=100&offset=10');
                setJobs(response.data.jobs);
                setLoading(false);
            } catch (error) {
                setError('Error fetching jobs. Please try again later.');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleApply =async (job) => {
        try {
            const response = await axios.get(`${baseUrl}/user/job`, {withCredentials: true});
    
            // Check if there's an error message
            if(response.status!=200){
                if(response.data.msg === "in sufficient balance"){
                    navigate('/details');
                }
                navigate('/login');
            }
        } catch (error) {
            console.error('Error applying to job:', error);
            // Handle errors, e.g., display an error message to the user
            if(error.response.status!=200){
                console.log(error.response.data);
                if(error.response.data.msg === "in sufficient balance"){
                    navigate('/details');
                    return
                }
                navigate('/login');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Job Listings</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error &&
                <div className="row">
                    {jobs.map(job => (
                        <div className="col-md-4 mb-4" key={job.title}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{job.title}</h5>
                                    <p className="card-text">{job.excerpt}</p>
                                    <p className="card-text">Company: {job.companyName}</p>
                                    <p className="card-text">Salary Range: {job.minSalary} - {job.maxSalary}</p>
                                    <button className="btn btn-primary" onClick={() => handleApply(job)}>Apply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default JobList;
