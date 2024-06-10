import React, { useState } from 'react';

function AddJob () {
    const [customerName, setCustomerName] = useState('');
    const [jobType, setJobType] = useState('');
    const [status, setStatus] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [technician, setTechnician] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        
        // Check if any field is empty
        if (!customerName || !jobType || !status || !appointmentDate || !technician) {
            setError('Please fill in all fields.');
            return;
        }
    
        try {
          const response = await fetch('http://127.0.0.1:5000/jobs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerName, jobType, status, appointmentDate, technician })
          });
    
          const data = await response.json();

          if (data.message) {
            setError(data.message)
          } else {
            setSuccess("Job has been added!")
          }
        } catch (error) {
          console.error('Error logging in:', error);
          setError('An unexpected error occurred. Please try again later.');
        }
      };


    return (
      <form onSubmit={handleSubmit}>
        <h3>New Job</h3>
        <div className="mb-3">
          <label>Customer Name</label>
          <input type="text"
            className="form-control"
            placeholder="Customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Job Type</label>
          <input type="text" 
          className="form-control" 
          placeholder="Job Type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          required
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <input type="text" 
          className="form-control" 
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          />
        </div>
        <div className="mb-3">
          <label>Appointment Date</label>
          <input type="datetime-local"
            className="form-control"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Technician</label>
          <input type="text"
            className="form-control"
            placeholder="Technician"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="text-center">
        {error && <p className="error-message text-center" style={{ color: '#ff1744', fontSize: '18px', fontWeight: 'bold' }}>{error}</p>}
        {success && <p className="success-message text-center" style={{ color: '#0000FF', fontSize: '18px', fontWeight: 'bold' }}>{success}</p>}
        </p>

      </form>
    )
}

export default AddJob;
