import React, { useEffect, useState } from "react";
import SingleSeat from "./SingleSeat";
import { useRouter } from "next/router";
import MovieService from "../../service/Movie";
import SeatSelectionModal from "./SeatSelectionModal";
import SeatFooter from "./SeatFooter";
import SeatsErrorModal from "./SeatsErrorModal";
import CommonButton from "../CommonButton";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setSelectedSeats } from "@/src/redux/reducers/seatReducer";
import {
  selectMovieData,
  selectSlotData,
  selectTheaterData,
} from "@/src/redux/reducers/currentBookingReducer";
import SummaryHeader from "./SummaryHeader";
import moment from "moment";

const NewSeatLayout = () => {
  const router = useRouter();
  const [slotDetails, setSlotDetails] = useState<any>();
  const [numRows, setNumRows] = useState<any>();
  const [selectedSeatsArr, setSelectedSeatsArr] = useState<number[]>([]);
  const [seatsCount, setSeatCount] = useState<number>(1);
  const [seatSelectionModalOpen, setSeatSelectionModalOpen] =
    useState<boolean>(true);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const seatsPerRow = 10;
  const [pricePTag, setPricePTag] = useState<number[]>([]);
  const [priceRangeArr, setPriceRangeArr] = useState<any[]>();

  const movieName = useAppSelector(selectMovieData).movieName;
  const theaterData = useAppSelector(selectTheaterData);
  const slotData = useAppSelector(selectSlotData);

  const dispatch = useAppDispatch();

  const getSlotDetails = () => {
    movieName &&
      theaterData &&
      slotData?.slotId &&
      MovieService.getOneSlotDetails(
        movieName,
        theaterData.id,
        slotData?.slotId
      )
        .then((res: any) => {
          setSlotDetails(res?.result[0].slots);
          console.log("arrr", res?.result[0].slots?.prices);
          setNumRows(res?.result[0]?.slots?.capacity / seatsPerRow);
          setPriceRangeArr(res?.result[0].slots?.prices);
          let arr: number[] = [];
          res?.result[0].slots?.prices?.map((ele: any) => {
            arr.push(ele?.start);
          });
          setPricePTag(arr);
        })
        .catch((err) => console.log(err));
  };
  useEffect(() => {
    const APIcalls = async () => {
      await getSlotDetails();
    };
    APIcalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieName, theaterData, slotData?.slotId]);

  const onResetHandler = () => {
    setSeatSelectionModalOpen(true);
    setSelectedSeatsArr([]);
    setSelectedSeatsCount(0);
  };

  const proceedToPayHandler = () => {
    alert("redirecting to payment screen");
  };

  const selectSeatHandler = (val: number) => {
    // if seat seletion limit is reached then show error modal
    if (selectedSeatsCount >= seatsCount && !selectedSeatsArr.includes(val)) {
      setErrorModal(true);
      return;
    }
    // check if the selected seat is available or not in the selected seat array
    if (selectedSeatsArr.includes(val)) {
      const arr = selectedSeatsArr.filter((ele) => ele !== val);
      setSelectedSeatsArr(arr);
      setSelectedSeatsCount(selectedSeatsCount - 1);

      // if seat is already selected then remove its rate from final price
      priceRangeArr?.map((ele: any) => {
        if (ele?.start < val && ele?.end > val) {
          setFinalPrice(finalPrice - ele?.rate);
        }
      });
    } else {
      setSelectedSeatsArr([...selectedSeatsArr, val]);
      setSelectedSeatsCount(selectedSeatsCount + 1);

      // if seat is not selected then add its rate to final price
      priceRangeArr?.map((ele: any) => {
        if (ele.start < val && ele.end > val) {
          setFinalPrice(finalPrice + ele.rate);
        }
      });
    }
  };

  const paymentHandler = () => {
    dispatch(setSelectedSeats(selectedSeatsArr));
    router.push(`/payment-screen`);
  };

  return (
    <>
      {errorModal && <SeatsErrorModal modalFunction={setErrorModal} />}

      {seatSelectionModalOpen && (
        <SeatSelectionModal
          seatsPerRow={seatsPerRow}
          setFunction={setSeatCount}
          seatsCount={seatsCount}
          modalFunction={setSeatSelectionModalOpen}
        />
      )}
      <SummaryHeader startTime={slotData.startTime} movieName={movieName} theaterName={theaterData.name} address={theaterData.address} date={moment(slotData.date).format("DD/MM/YYYY")} />

      <div className="flex h-[77vh] w-full flex-row">
        <div className="left w-2/3 h-2/3 flex items-center flex-col">
          <div className="screen flex flex-col content-center mt-6 items-center">
            <p className="flex content-center justify-center ">
              All eyes this way please!
            </p>
            <div className="bg-gray-300 w-2/3  h-2 drop-shadow-2xl mb-4 flex justify-center border border-b-blue-400 shadow-blue-500 shadow-lg"></div>
            {numRows && (
              <div className="grid grid-rows-5 gap-4 mt-12 relative">
                {[...Array(numRows)].map((_, rowIndex) => (
                  <>
                    <div key={rowIndex} className="flex items-center">
                      {[...Array(seatsPerRow)].map((_, seatIndex) => {
                        const seatNumber =
                          rowIndex * seatsPerRow + seatIndex + 1;
                        const isOccupied = slotDetails?.bookedSeats.some(
                          (seat: any) => seat.seatNumber === seatNumber
                        );
                        const isSelected = selectedSeatsArr?.some(
                          (seat: any) => seat === seatNumber
                        );

                        return (
                          <SingleSeat
                            key={seatIndex}
                            seatNumber={seatNumber}
                            isOccupied={isOccupied}
                            isSelected={isSelected}
                            seatSelection={selectSeatHandler}
                            seatCount={seatsCount}
                            isPTag={pricePTag && pricePTag.includes(seatNumber)}
                          />
                        );
                      })}
                    </div>
                  </>
                ))}
                {}
              </div>
            )}
          </div>
        </div>
        <div className="right w-1/3 h-1/3 flex justify-center mr-40 items-center flex-col">
          <div
            className="sub-heading flex flex-row justify-evenly w-full"
            onClick={() => onResetHandler()}
          >
            <CommonButton text="Change Seat Limit" />
          </div>
          <SeatFooter />
        </div>
      </div>

      {selectedSeatsArr.length === seatsCount && (
        <div
          className="bottom relative bottom-0 bg-gray-200 flex justify-center items-center h-[3rem]"
          onClick={() => paymentHandler()}
        >
          <CommonButton text={`Pay Now Rs. ${finalPrice}`} />
        </div>
      )}
    </>
  );
};

export default NewSeatLayout;
