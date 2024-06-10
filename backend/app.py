from flask import Flask, json, jsonify, request, session
from flask_cors import CORS
from operator import attrgetter
import os

app = Flask(__name__)
app.secret_key = 'njnjfrweadvgwedgwedse'
CORS(app)

# read JSON file
SITEROOT = os.path.realpath(os.path.dirname(__file__))
jsonUrl = os.path.join(SITEROOT, "data", "jobs.json")
jobList = json.load(open(jsonUrl))

@app.route("/jobs", methods=['GET'])
def getJobs():
    try:
        return jsonify(jobList)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/jobs/<id>", methods=['GET'])
def getJob(id):
    try:
        id = int(id)
        job = [x for x in jobList if x["id"] == id]
        if ((job is not None) and (job != [])):
            return jsonify(job[0])
        else:
            return jsonify({"message": "Job not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/jobs', methods=['POST'])
def postJob():
    jobIds = [x["id"] for x in jobList] 
    newId = max(jobIds) + 1
    data = request.get_json()
    
    customerName = data.get('customerName')
    jobType = data.get('jobType')
    status = data.get('status')
    appointmentDate = data.get('appointmentDate')
    if (appointmentDate[-4:] != ":00Z"):
        appointmentDate = appointmentDate + ":00Z"
    technician = data.get('technician')

    if ((customerName is None) or (jobType is None)
        or (status is None) or (appointmentDate is None) or (technician is None)):
        return jsonify({"message": "Improper job data"}), 422
    
    try:
        jobExisted = [x for x in jobList if ((x["customerName"] == customerName) and (x["jobType"] == jobType)
            and (x["status"] == status) and (x["appointmentDate"] == appointmentDate)
            and (x["technician"] == technician))]
        if ((jobExisted is not None) and (jobExisted != [])):
            return jsonify({"message": "Duplicate job"}), 409
        
        newJob = {"id": newId, "customerName": customerName, "jobType": jobType, "status": status, 
            "appointmentDate": appointmentDate, "technician": technician}
        jobList.append(newJob)
        
        json.dump(jobList, open(jsonUrl, "w"))
        
        return jsonify(newJob), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/jobs/<id>', methods=['PUT'])
def putJob(id):
    try:
        jobId = [x["id"] for x in jobList].index(int(id))
    except ValueError:
        return jsonify({"message": "Job ID not found"}), 404

    data = request.get_json()
    if data.get('customerName'):
        jobList[jobId]["customerName"] = data["customerName"]
    if data.get('jobType'):
        jobList[jobId]["jobType"] = data["jobType"]
    if data.get('status'):
        jobList[jobId]["status"] = data["status"]
    if data.get('appointmentDate'):
        appointmentDate = data["appointmentDate"]
        if (appointmentDate[-4:] != ":00Z"):
            appointmentDate = appointmentDate + ":00Z"
        jobList[jobId]["appointmentDate"] = appointmentDate
    if data.get('technician'):
        jobList[jobId]["technician"] = data["technician"]
    
    json.dump(jobList, open(jsonUrl, "w"))

    return jsonify(jobList[jobId]), 200

@app.route('/jobs/<id>', methods=['DELETE'])
def deleteJob(id):
    try:
        jobId = [x["id"] for x in jobList].index(int(id))
    except ValueError:
        return jsonify({"message": "Job ID not found"}), 404

    del jobList[jobId]
    json.dump(jobList, open(jsonUrl, "w"))

    return jsonify({'message': f'Job <{id}> successfully deleted'}), 202

if __name__ == '__main__':
    app.run(debug=False, port=5000, host='0.0.0.0') 
