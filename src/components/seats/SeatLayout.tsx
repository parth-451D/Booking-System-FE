import React, { useEffect, useState } from "react";
import SingleSeat from "./SingleSeat";
import { useRouter } from "next/router";
import MovieService from "../../service/Movie";
import SeatSelectionModal from "./SeatSelectionModal";
import SeatFooter from "./SeatFooter";
import SeatsErrorModal from "./SeatsErrorModal";
import CommonButton from "../CommonButton";

const SeatLayout = () => {
  const router = useRouter();
  const { movieName, theaterId, slotId } = router.query;
  const [slotDetails, setSlotDetails] = useState<any>();
  const [numRows, setNumRows] = useState<any>();
  const [selectedSeatsArr, setSelectedSeatsArr] = useState<number[]>([]);
  const [seatsCount, setSeatCount] = useState<number>(1);
  const [seatSelectionModalOpen, setSeatSelectionModalOpen] =
    useState<boolean>(true);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState<number>(0);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const seatsPerRow = 10;

  const getSlotDetails = () => {
    movieName &&
      theaterId &&
      slotId &&
      MovieService.getOneSlotDetails(movieName, theaterId, slotId)
        .then((res: any) => {
          setSlotDetails(res?.result[0].slots);
          setNumRows(res?.result[0]?.slots?.capacity / seatsPerRow);
        })
        .catch((err) => console.log(err));
  };
  useEffect(() => {
    const APIcalls = async () => {
      await getSlotDetails();
    };
    APIcalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieName, theaterId, slotId]);

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
    } else {
      setSelectedSeatsArr([...selectedSeatsArr, val]);
      setSelectedSeatsCount(selectedSeatsCount + 1);
    }
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
      <div className="gap-6 flex h-full items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Movie Theatre Seating</h1>
        <div className="sub-heading flex flex-row justify-evenly w-full">
          <div onClick={() => onResetHandler()}>
            <CommonButton text="Seat limit Change" />
          </div>
          <div className="screen flex flex-col">
            <p className="content-center  justify-center ">
              All eyes this way please!
            </p>
            <div className="bg-gray-300 w-full h-2 drop-shadow-2xl mb-4 flex justify-center border border-b-blue-400 shadow-blue-500 shadow-lg"></div>
          </div>
          <div onClick={() => proceedToPayHandler()} className={`${seatsCount !== selectedSeatsArr.length ? "pointer-events-none" : ""}`}>
              <CommonButton text="Procced to Pay" />
          </div>
        </div>
        {numRows && (
          <div className="grid grid-rows-5 gap-4">
            {[...Array(numRows)].map((_, rowIndex) => (
              <>
                <div key={rowIndex} className="flex items-center">
                  {[...Array(seatsPerRow)].map((_, seatIndex) => {
                    const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
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
                      />
                    );
                  })}
                </div>
              </>
            ))}
            {}
          </div>
        )}
        <SeatFooter />
      </div>
    </>
  );
};

export default SeatLayout;
