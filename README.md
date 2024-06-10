# ProfitFill / ADHOME Assignment

# Project Setup Guide

## Backend Setup (Python Flask)

### 1. Create Python 3.12 Virtual Environment
```bash
python -m venv venv
```

### 2. Activate Virtual Environment
#### For macOS/Linux:
```bash
source venv/bin/activate
```
#### For Windows:
```bash
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Flask Server
```bash
cd Backend
flask run
```

## Frontend Setup (React)

### 1. Install Node.js and npm
- Download and install Node.js from [nodejs.org](https://nodejs.org/).

### 2. Install Dependencies
```bash
cd Frontend
npm install
```

### 3. Start Development Server
```bash
npm start
```

## Accessing the Application
- Once both the backend Flask server and frontend development server are running, you can access the application in your web browser at `http://localhost:3000`.

# Backend Tests

I use POSTMAN software to test if the Backend working properly
## Get All Jobs

<img src="images/be_getjobs.png">

## Get A Job by Id

<img src="images/be_getjobid.png">

## Return Error if Get a Wrong ID

<img src="images/be_getjobsid_notfound.png">

## Return Error if Add an Existing Job

<img src="images/be_postjobs_dup.png">

## Return Error if Add a Job without a Name

<img src="images/be_postjobs_wocustomername.png">

## Return the New Job if Added Successfully

<img src="images/be_postjobs.png">

After that, I can re-check if the Job can be listed

<img src="images/be_postjobs_check.png">

## Return Error if Update (PUT) with a wrong Job ID

<img src="images/be_putjobs_idnotfound.png">

## If Update (PUT) a Job successfully

<img src="images/be_putjobs.png">

## If Delete a Job by a Wrong ID

<img src="images/be_deletejobs_wrongid.png">

## If Delete a Job Successfully

<img src="images/be_deletejobs.png">

# Frontend Tests

I checked Frontend on Internet Explorer

http://localhost:3000

## Job List View

<img src="images/fe.png">

## Job Details View

<img src="images/fe_jobdetails.png">

## Add Job Form

If successfully added

<img src="images/fe_addjob.png">

After added, I re-list all the jobs to see the new one

<img src="images/fe_addjob2.png">

## Update a Job

<img src="images/fe_jobupdate.png">

## I click the X button on the Job List to delete JOb #3

<img src="images/fe_jobdelete.png">