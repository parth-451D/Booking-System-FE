import React from "react";

const CommonButton = (props: any) => {
  return (
    <div>
      <button className="reset px-6 py-2 text-white bg-indigo-600 rounded-md hover:cursor-pointer background-transparent font-bold text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
        {props.text}
      </button>
    </div>
  );
};

export default CommonButton;
