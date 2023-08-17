import Service from "@/src/Lib/service";
import { AxiosResponse } from "axios";

const MovieService = {
  getMovies: async (): Promise<AxiosResponse> => {
    try {
      return await Service.get(`/master/getMovies`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getTheaterForMovie: async (query: any): Promise<AxiosResponse> => {
    try {
      return await Service.get(`/master/getTheaters?movieName=${query}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getDatesOfSlots: async (
    movieName: any,
    theaterId: any
  ): Promise<AxiosResponse> => {
    try {
      return await Service.get(
        `/master/getDatesOfMovie?movieName=${movieName}&theaterId=${theaterId}`
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getSlotsOFOneDate: async (
    movieName: any,
    theaterId: any,
    date: any
  ): Promise<AxiosResponse> => {
    try {
      return await Service.get(
        `/master/getSlotsByDate?movieName=${movieName}&theaterId=${theaterId}&date=${date}`
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getOneSlotDetails: async (
    movieName: any,
    theaterId: any,
    slotId: any
  ): Promise<AxiosResponse> => {
    try {
      return await Service.get(
        `/master/getSlotDetails?movieName=${movieName}&theaterId=${theaterId}&slotId=${slotId}`
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default MovieService;
