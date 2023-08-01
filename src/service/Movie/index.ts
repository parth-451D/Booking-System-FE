import Service from "@/src/Lib/service";
import { AxiosResponse } from "axios";

const MovieService = {
  getMovies: async (): Promise<AxiosResponse> => {
    try {
      return await Service.get(`master/getMovies`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default MovieService;
