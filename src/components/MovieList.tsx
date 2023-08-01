import Image from "next/image";
import React, { useEffect, useState } from "react";
import MovieService from "../service/Movie";

const MovieList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const getMoviesData = async () => {
    await MovieService.getMovies()
      .then((res: any) => {
        setMoviesList(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const APIcalls = async () => {
      await getMoviesData();
    };
    APIcalls();
  }, []);

  return (
    <div className="bg-[#d1d1d1]">
      <div className="flex content-center justify-center">
        <h2 className="mt-5 mb-5 text-5xl font-bold">Latest Movies</h2>
      </div>
      <div className="grid grid-cols-4 gap-4 m-10">
        {moviesList &&
          moviesList?.map((ele: any, index: number) => {
            return (
              <div
                className="card1 
              "
                key={index}
              >
                <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <div
                    className="relative overflow-hidden bg-cover bg-no-repeat"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <Image
                      className="rounded-t-lg "
                      height="100"
                      width="100"
                      src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
                      alt=""
                    />
                    <a href="#!">
                      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                    </a>
                  </div>
                  <div className="p-6 shadow-sm shadow-black/30 dark:shadow-black/50">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      {ele?.movieName}
                    </h5>
                    <ul>
                      <li>
                        <strong>Cast:&nbsp;</strong>
                        {ele?.cast?.map((item: any) => item + "," + " ")}
                      </li>
                      <li>
                        <strong>Director: &nbsp;</strong>
                        {ele?.director}
                      </li>
                      <li>
                        <strong>Duration: &nbsp;</strong>
                        {ele?.duration}
                      </li>
                    </ul>
                    <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                      <span className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:cursor-pointer mt-4">
                        Book Tickets
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MovieList;
