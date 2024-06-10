import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateJob() {
  const {id} = useParams();
  const [customerName, setCustomerName] = useState('ABC');
  const [jobType, setJobType] = useState('');
  const [status, setStatus] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [technician, setTechnician] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      setCustomerName(data.customerName)
      setJobType(data.jobType)
      setStatus(data.status)
      data.appointmentDate = data.appointmentDate.substring(0, data.appointmentDate.length - 4);
      setAppointmentDate(data.appointmentDate)
      setTechnician(data.technician)
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  }
  
  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate input
    if (!customerName && !jobType && !status && !appointmentDate && !technician) {
      setError('Please fill at least one field');
      return;
    }

    try {
      // Send request to update password
      const response = await fetch('http://127.0.0.1:5000/jobs/' + id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerName, jobType, status, appointmentDate, technician })
      });
      const data = await response.json();

      if (data.message) {
        setError(data.message)
      } else {
        setSuccess("Job has been updated!")
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h3 style={{color:"#66bb6a"}}>Update Job #{id}</h3>
      <form onSubmit={handleUpdateJob}>
        <div className="mb-3">
          <label>Customer Name</label>
          <input type="text"
            className="form-control"
            placeholder="Customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Job Type</label>
          <input type="text" 
          className="form-control" 
          placeholder="Job Type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <input type="text" 
          className="form-control" 
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Appointment Date</label>
          <input type="datetime-local"
            className="form-control"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Technician</label>
          <input type="text"
            className="form-control"
            placeholder="Technician"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
        <p className="text-center">
        {error && <p className="error-message text-center" style={{ color: '#ff1744', fontSize: '18px', fontWeight: 'bold' }}>{error}</p>}
        {success && <p className="success-message text-center" style={{ color: '#0000FF', fontSize: '18px', fontWeight: 'bold' }}>{success}</p>}
        </p>

      </form>
    </div>
  );
}

export default UpdateJob;
