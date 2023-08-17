import React from "react";

const SingleSeat = (props: any) => {
  const { isOccupied, seatNumber, seatSelection, isSelected, seatCount } =
    props;
  return (
    <div
      onClick={() => {
        if (!isOccupied) {
          seatSelection(seatNumber);
        }
      }}
      className={`w-8 h-8 border m-1 flex items-center border-indigo-600 justify-center
          bg-white text-indigo-950 hover:cursor-pointer hover:bg-indigo-600 hover:text-white
          ${isSelected ? "selected" : ""}
          ${isOccupied ? "disabled" : ""}`}
    >
      {seatNumber}
    </div>
  );
};

export default SingleSeat;
