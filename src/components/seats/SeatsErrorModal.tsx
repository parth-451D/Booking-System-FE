import React from "react";
import CommonButton from "../CommonButton";

const SeatsErrorModal = (props: any) => {
  const { modalFunction } = props;
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative w-[50vh] flex flex-col h-[20vh] bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-center border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl p-2 font-semibold">
                <p>Warning !!!!</p>
              </h3>
            </div>
            <div className="text h-[10vh] flex justify-center items-center font-bold uppercase text-sm">
              Selected seats limit is reached
            </div>
            <div
              className="flex items-center justify-center border-t border-solid border-slate-200 rounded-b "
              onClick={() => modalFunction(false)}
            >
              <CommonButton text="OK" />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SeatsErrorModal;
