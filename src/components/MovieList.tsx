import Image from "next/image";
import React, { useEffect, useState } from "react";
import MovieService from "../service/Movie";
import { useRouter } from "next/router";

const MovieList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const router = useRouter()
  const getMoviesData = () => {
    MovieService.getMovies()
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
              <>
                <div className="flex flex-row h-full">
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <Image
                        className="rounded-t-lg h-1/2 w-full"
                        src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
                        alt=""
                        width={100}
                        height={100}
                      />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {ele?.movieName}
                        </h5>
                      </a>
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
                      <div className="hidden mr-3 space-x-4 lg:flex nav__item" onClick={() => router.push(`/theaters?movieName=${ele.movieName}`)}>
                        <span className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:cursor-pointer mt-4">
                          Book Tickets
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default MovieList;
