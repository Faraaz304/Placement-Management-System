import React from 'react';
import "../CSS/Dashboard.css"
import { useState,useEffect } from 'react';
import Navbar from '../components/navbar';  



function Dashboard() {
    const [jobs ,setJobs]=useState([])
    
    useEffect(() => {
        // Fetch jobs data from Flask API
        fetch("http://127.0.0.1:5000/api/jobs")
          .then(response => response.json())  // Parse the JSON response
          .then(data => {
            console.log(data);  // Log the data to the console
            setJobs(data);  // Update the state with the fetched jobs
          })
          .catch(error => {
            console.error("Error fetching jobs data:", error);
          });
      }, []); 
  
  return (
    <>
    <body>
    <Navbar/>
    <div className="container">
        <aside>
            <div className="profile">
                <div className="top">
                    <div className="profile-photo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Korotkevich_ITMO.jpg/800px-Korotkevich_ITMO.jpg" alt=""/>
                    </div>
                    <div className="info">
                        <p>Hey, <b>Alex</b> </p>
                        <small className="text-muted">12102030</small>
                    </div>
                </div>
                <div className="about">
                    <h5>Course</h5>
                    <p>BTech. Computer Science & Engineering</p>
                    <h5>DOB</h5>
                    <p>29-Feb-2020</p>
                    <h5>Contact</h5>
                    <p>1234567890</p>
                    <h5>Email</h5>
                    <p>unknown@gmail.com</p>
                    <h5>Address</h5>
                    <p>Ghost town Road, New York, America</p>
                </div>
            </div>
        </aside>

        <main>
            <h1><span className='danger'>Recommended</span> Jobs</h1>

            
                <table className="table mb-0 bg-white border" style={{width :"195%"}}>
                    <thead className="bg-light">
                        <tr>
                        <th>Company Name</th>
                        <th>Job Title</th>
                        <th>Salary</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    {jobs.map((job, index) => (
                    <tr key={index}>

                    <td>
                        <div className="d-flex align-items-center">
                        <img
                            src={job.companyLogoUrl}
                            alt=""
                            style={{ width: '45px', height: '45px' }} 
                            className="rounded-circle "
                            />
                        <div className="ms-3">
                            <p className="fw-bold mb-1 ml-2">{job.companyName}</p>
                        </div>
                        </div>
                    </td>

                    <td>
                        <p className="text-muted mt-3">{job.jobTitle}</p>
                    </td>

                    <td>
                    <p className="text-muted mt-3">{job.salary}</p>

                    </td>



                    <td>
                    <button type="button" className="btn btn-link btn-sm btn-rounded mt-3">
                    Apply Now
                    </button>
                    </td>
                    </tr>
                    ))}  
 
                    </tbody>
                </table>

        
        </main>  
    </div>

    </body>
    </>
  );
}

export default Dashboard;
