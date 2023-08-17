import React from "react";

const SeatFooter = () => {
  return (
    <div className="flex items-center justify-center mt-4 mb-4">
      <div className="available flex flex-row">
        <div className="w-8 h-8 border m-4 flex items-center border-indigo-600 justify-center bg-white text-indigo-950"></div>
        <p className="flex items-center justify-center">Available Seats</p>
      </div>
      <div className="booked flex flex-row">
        <div className="w-8 h-8 border m-4 flex items-center border-indigo-600 justify-center bg-gray-300 text-black"></div>
        <p className="flex items-center justify-center">Booked Seats</p>
      </div>
      <div className="selected-seats flex flex-row">
        <div className="w-8 h-8 border m-4 flex items-center border-indigo-600 justify-center bg-indigo-600 text-white bg-gray-30"></div>
        <p className="flex items-center justify-center">Selected Seats</p>
      </div>
    </div>
  );
};

export default SeatFooter;
