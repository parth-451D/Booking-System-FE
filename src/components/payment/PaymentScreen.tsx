import React from "react";
import info from "../../assets/img/info.svg";
import Image from "next/image";
import CommonButton from "../CommonButton";
import PayNowButton from "./PayNowButton";
import SummaryHeader from "../seats/SummaryHeader";
import { useAppSelector } from "@/src/redux/hooks";
import {
  selectMovieData,
  selectSlotData,
  selectTheaterData,
} from "@/src/redux/reducers/currentBookingReducer";
import moment from "moment";
const PaymentScreen = () => {
  const movieName = useAppSelector(selectMovieData).movieName;
  const theaterData = useAppSelector(selectTheaterData);
  const slotData = useAppSelector(selectSlotData);
  return (
    <div className="bg-gray-200 h-[100vh]">
      <SummaryHeader startTime={slotData.startTime} movieName={movieName} theaterName={theaterData.name} address={theaterData.address} date={moment(slotData.date).format("DD/MM/YYYY")} />
      {/* ticket summary */}
      <div className="flex flex-row mt-2">
        <div className="ads bg-gray-200 h-[60vh] w-3/5 flex flex-col justify-center items-center">
          <div className="box">
            <p>Ads will be shown here</p>
          </div>
        </div>
        <div className="flex flex-col w-2/5">
          {/* first div  */}
          <div className="summary bg-blue-100 h-fit border mr-28 border-black">
            <div className="summary-details p-6">
              <span className="heading flex justify-center items-center mb-4">
                Booking Summary
              </span>
              <div className="flex flex-row justify-between p-2">
                <span className="tic">Tickets : 12, 23, 42</span>
                <p>Rs. 600.00</p>
              </div>
              <div className="flex flex-row justify-between p-2">
                <span className="tic">Convenience Fees</span>
                <p>Rs. 60.00</p>
              </div>
              <div className="line bg-black h-0.5"></div>
              <div className="flex flex-row justify-between p-2">
                <span className="tic">Sub Total</span>
                <p>Rs. 660.00</p>
              </div>
            </div>
            <div className="amount bg-yellow-200  text-black p-2">
              <div className="flex flex-row justify-between p-2">
                <span className="tic">Payable Amount</span>
                <p>Rs. 660.00</p>
              </div>
            </div>
          </div>

          {/* second div  */}
          <div className="note flex flex-row p-2">
            <Image
              src={info}
              height={25}
              width={25}
              alt="info"
              className="mr-2"
            />{" "}
            By proceeding, I express my consent to complete this transaction.
          </div>

          {/* third div */}
          <PayNowButton />
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
