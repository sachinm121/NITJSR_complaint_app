import React, { useEffect, useState } from 'react';
import Card from './Card'

const StudentDetails = () => {
  const [registrationNo, setRegistrationNo] = useState('');
  const [data, setData] = useState({})

  // console.log(data);

  const handleSearch = async(e) => {
    e.preventDefault();
    console.log('Searching for registration number:', registrationNo);

    let res = await fetch(`http://localhost:4000/api/v1/get/student/details?rollNo=${registrationNo}`)
    res = await res.json()
    // console.log(res.student);
    setData(res.student)

  };

  

  // Data insert 
  // const name = data.name
  // const rollNo = data.rollNo
  // const hostel = 

  console.log(data);
  const handleChange = (e) => {
    e.preventDefault()
    setRegistrationNo(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-8 mb-4">Search Student by Registration Number</h1>
      <form onSubmit={handleSearch}>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Enter Registration Number..."
            value={registrationNo}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>
      {<Card data={data}/>}
    </div>
  );
};

export default StudentDetails;
