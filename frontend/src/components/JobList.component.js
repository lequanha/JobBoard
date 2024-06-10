import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/jobs'); // Adjust the endpoint according to your backend route
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const deleteJob = (id) => {
    fetch(`http://127.0.0.1:5000/jobs/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            setError("");
            setSuccess("");
            if (!response.ok) {
                throw new Error('Failed to delete job');
            }
            // Filter out the deleted user from the users array
            setJobs(jobs => jobs.filter(job => job.id !== id));
            setSuccess('Deleted Job #' + id)
        })
        .catch(error => {
            console.error('Error deleting job:', error);
            setError('Failed to delete job #' + id);
        });
  };

      return (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <h3 style={{color: "#f44336"}}>Job List</h3>
          {error && <div className="text-danger">{error}</div>}
          {success && <div className="text-success">{success}</div>}
          <table className="table">
            <thead>
              <tr>
                <th>Delete</th>
                <th scope="col">ID</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Appointment Date</th>
                <th>View</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                  <tr key={index}>
                    <td>
                      <Button variant="danger" onClick={() => deleteJob(job.id)}>&#10060;</Button>
                    </td>
                    <td>{job.id}</td>
                    <td>{job.customerName}</td>
                    <td>{job.appointmentDate}</td>
                    <td>
                      <Link to={`/jobs/${job.id}`}>
                        <Button>&#128065;</Button>
                      </Link>
                    </td>
                    <td>
                    <Link to={`/update_job/${job.id}`}>
                        <Button>&#9998;</Button>
                    </Link> 
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <Link to="/add_job">
              <Button>Add Job</Button>
            </Link>
          </div>
        </div>
      );
    }

    export default Jobs;