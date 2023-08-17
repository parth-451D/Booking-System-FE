import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MovieService from "../service/Movie";

const TheaterList = () => {
  const router = useRouter();
  const { movieName } = router.query;
  const [theaterList, setTheaterList] = useState([]);

  const getTheaterList = () => {
    movieName &&
      MovieService.getTheaterForMovie(movieName)
        .then((res: any) => setTheaterList(res.result[0].theaters))
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    const APIcalls = async () => {
      await getTheaterList();
    };
    APIcalls();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieName]);

  return (
    <>
      <div className="bg-[#d1d1d1] h-[calc(100vh-7.5rem)]">
        <div className="flex content-center justify-center">
          <h2 className="mt-5 mb-5 text-5xl font-bold">
            Pick Your Theater for Movie {movieName}
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-4 m-10">
          {theaterList &&
            theaterList?.map((ele: any, index: number) => {
              return (
                <>
                  <div className="min-w-max max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {ele?.name}
                      </h5>
                    </a>
                    <ul>
                      <li>
                        <strong>Address: &nbsp;</strong>
                        {ele?.address}
                      </li>
                      <li>
                        <strong>Rating: &nbsp;</strong>
                        {ele?.rating}
                      </li>
                    </ul>
                    <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                      <span className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:cursor-pointer mt-4" onClick={() => router.push(`/slot-layout?movieName=${movieName}&theaterId=${ele?._id}`)}>
                        Book Tickets
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default TheaterList;
