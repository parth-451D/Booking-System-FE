import React from "react";

const SummaryHeader = (props: any) => {
  return (
    <div className="w-full h-[5rem] bg-gray-700 text-white flex justify-center items-center flex-col">
      <h2>{props.movieName}</h2>
      <p>{props.theaterName} : {props.address} | {props.date}, {props.startTime}</p>
    </div>
  );
};

export default SummaryHeader;
