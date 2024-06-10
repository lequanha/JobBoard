import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function JobComponent() {
  const {id} = useParams();

  const [job, setJob] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/jobs/'+ id ); // Adjust the endpoint according to your backend route
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };


  return (
    <div>
      <h2 style={{ color: '#2196f3' }} >Job Detail #{job.id}</h2>
      {error && <div className="text-danger">{error}</div>}
      <p>Customer Name: {job.customerName}</p>
      <p>Job Type: {job.jobType}</p>
      <p>Status: {job.status}</p>
      <p>Appointment Date: {job.appointmentDate}</p>
      <p>Technician: {job.technician}</p>
      <div>
      <Link to={`/update_job/${job.id}`}>
          <Button>Update</Button>
      </Link>   
      </div>
    </div>
  );
}

export default JobComponent;