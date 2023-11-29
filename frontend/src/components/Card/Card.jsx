// Card.js

import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out items-center mx-auto w-[600px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
