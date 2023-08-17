import Image from "next/image";
import React, { useEffect, useState } from "react";
import arrowleft from "../assets/img/arrowleft.svg";
import arrowright from "../assets/img/arrowright.svg";
import { useRouter } from "next/router";
import MovieService from "../service/Movie";
import moment from "moment";

const SlotLayout = () => {
  const router = useRouter();
  const { movieName, theaterId } = router.query;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dates, setDates] = useState<[{ date: any }]>([{ date: null }]);
  const [slots, setSlots] = useState([]);

  const getSlotDates = () => {
    movieName &&
      theaterId &&
      MovieService.getDatesOfSlots(movieName, theaterId)
        .then((res: any) => {
          setDates(res.result);
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    const APIcalls = async () => {
      await getSlotDates();
    };
    APIcalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieName, theaterId]);

  const getSlotsOfDateProvided = () => {
    movieName &&
      theaterId &&
      MovieService.getSlotsOFOneDate(
        movieName,
        theaterId,
        dates[currentSlide]?.date
      )
        .then((res: any) => {
          setSlots(res.result[0].slotsData);
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    const APIcalls = async () => {
      await getSlotsOfDateProvided();
    };
    APIcalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, dates]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? dates.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === dates.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      {dates && (
        <div
          id="controls-carousel"
          className="relative w-full"
          data-carousel="static"
        >
          {/* Carousel wrapper */}
          <div className="relative h-28 overflow-hidden rounded-lg  bg-slate-200 flex justify-center items-center">
            {dates.map((ele: any, index) => (
              <>
                <div
                  key={index}
                  className={`${
                    index === currentSlide ? "block" : "hidden"
                  } duration-700 ease-in-out`}
                  data-carousel-item={index === currentSlide ? "active" : ""}
                >
                  <div className="data-input-tag rounded-lg m-3 p-3 h-full w-full bg-indigo-300 flex flex-col">
                    <span className="justify-center items-center flex">
                      {moment(ele?.date).format("ddd").toUpperCase()}
                    </span>
                    <span className="justify-center items-center flex">
                      {" "}
                      {moment(ele?.date).format("D").toUpperCase()}
                    </span>
                    <span className="justify-center items-center flex">
                      {moment(ele?.date).format("MMM").toUpperCase()}
                    </span>
                  </div>
                </div>
              </>
            ))}
            {/* Slider controls */}
            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
              onClick={prevSlide}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <Image
                  src={arrowleft}
                  height={100}
                  width={100}
                  alt="arrowleft"
                  className="h-5"
                />
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
              onClick={nextSlide}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <Image
                  src={arrowright}
                  height={100}
                  width={100}
                  alt="arrowright"
                  className="h-5"
                />
              </span>
            </button>
          </div>
        </div>
      )}
      <br />
      <div className="header mt-4 bold text-2xl flex justify-center items-center mb-4">
        Please select the Show Timing of your choice
      </div>
      <div className="card grid grid-cols-4 gap-4 m-10">
        {slots &&
          slots?.map((slot: any, index: number) => {
            return (
              <div
                key={index + 1}
                className="show max-w-3xl w-1/3 bg-white border-2 border-indigo-600  flex justify-center items-center rounded-lg m-auto pt-5 pb-5 hover:bg-gray-300 hover:cursor-pointer"
                onClick={() => {
                  router.push(
                    `/seat-layout?movieName=${movieName}&theaterId=${theaterId}&slotId=${slot?._id}`
                  );
                }}
              >
                <div className="flex flex-col">
                  <p>
                    {moment(
                      slot?.startTime.toString().length === 4
                        ? slot?.startTime
                        : `0${slot?.startTime.toString()}`,
                      "HHmm"
                    ).format("hh:mm A")}
                  </p>
                  <p>
                    {moment(
                      slot?.endTime.toString().length === 4
                        ? slot?.endTime
                        : `0${slot?.endTime.toString()}`,
                      "HHmm"
                    ).format("hh:mm A")}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SlotLayout;
