import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Jobs from './components/JobList.component'
import JobComponent from './components/JobDetails.component'
import AddJob from './components/AddJob.component'
import UpdateJob from './components/UpdateJob.component'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Job Board
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/jobs">
                                    Job List
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add_job">
                                    Add a New Job
                                </Link>
                            </li>
                </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            {/* Render Routes conditionally based on authentication status */}
            <Routes>
              <Route path="/" element={<Jobs />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobComponent />} />
              <Route path="/add_job" element={<AddJob />} />
              <Route path="/update_job/:id" element={<UpdateJob />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;