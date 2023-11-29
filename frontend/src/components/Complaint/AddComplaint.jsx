import React, { useState } from 'react';

const AddComplaint = () => {
  const [complaintType, setComplaintType] = useState('');
  const [complaint, setComplaint] = useState('');

  const handleComplaintTypeChange = (e) => {
    setComplaintType(e.target.value);
  };

  const handleComplaintChange = (e) => {
    setComplaint(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("student"))._id
    const URL = `http://localhost:4000/api/v1/create/complaint/${userId}`;

    let res = await fetch(URL, {
      method: 'POST',
      headers:{
        "content-type": "application/json"
      },

      body: JSON.stringify({complaintType,complaint})
    })

    if(res.ok){
      alert("Complaint submit successfully")
      res = await res.json();
      console.log(res);
    }













    // Handle form submission - You can perform actions like API calls here
    console.log('Complaint Type:', complaintType);
    console.log('Complaint:', complaint);
    // Reset the form fields if needed
    setComplaintType('');
    setComplaint('');
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complaintType">
            Complaint Type
          </label>
          <select
            className="block appearance-none w-full border border-gray-300 py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
            id="complaintType"
            value={complaintType}
            onChange={handleComplaintTypeChange}
          >
            <option value="">Select complaint type</option>
            <option value="electrician">Electric</option>
            <option value="civil">Civil</option>
            <option value="mess">Mess</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complaint">
            Complaint
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="complaint"
            placeholder="Enter your complaint"
            value={complaint}
            onChange={handleComplaintChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComplaint;
