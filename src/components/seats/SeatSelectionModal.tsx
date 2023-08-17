import React from "react";
import CommonButton from "../CommonButton";

const SeatSelectionModal = (props: any) => {
  const { seatsPerRow, setFunction, seatsCount, modalFunction } = props;
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* main wrapper div  */}
          <div className="border-0 rounded-lg shadow-lg relative w-[40rem] flex flex-col h-[25rem] bg-white outline-none focus:outline-none">
            {/* header div  */}
            <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                <p>How Many Seats?</p>
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto flex justify-center items-center">
              <div className="flex w-[50vh] h-[20vh] justify-center items-center">
                <div className={`image bg-[url("/assets/car.svg")]`}></div>
                <ul className="flex flex-row">
                  {[...Array(seatsPerRow)]?.map((_, i: number) => {
                    return (
                      <div
                        key={i}
                        onClick={() => setFunction(i + 1)}
                        className={`hover:cursor-pointer rounded-full p-2 h-10 w-10 m-1 ${
                          seatsCount === i + 1
                            ? "bg-indigo-600 text-white hover:bg-indigo-500"
                            : "bg-gray-300 text-black hover:bg-gray-500"
                        }`}
                      >
                        <span className="flex justify-center items-center">
                          {i + 1}
                        </span>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* footer  */}
            <div
              className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b"
              onClick={() => modalFunction(false)}
            >
              <CommonButton text="Select Seats" />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SeatSelectionModal;
