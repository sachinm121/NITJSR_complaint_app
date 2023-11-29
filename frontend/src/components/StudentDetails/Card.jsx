import React from 'react';
// { student }
const Card = ({data}) => {
  return (
    <div className="grid max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">Name: {data.name}</div>
        <p className="text-gray-700 text-base">
          Registration Number:{data.rollNo}
        </p>
        <p className="text-gray-700 text-base">Hostel: {data.hostel}</p>
        <p className="text-gray-700 text-base">RoomNo: {data.roomNo}</p>
        <p className="text-gray-700 text-base">Phone: {data.phone}</p>
        <p className="text-gray-700 text-base">Email: {data.email}</p>
        {/* Add more details here */}
      </div>
    </div>
  );
};

export default Card;
