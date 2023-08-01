import Service from "@/src/Lib/service";
import { AxiosResponse } from "axios";

const AuthService = {
  register: async (data: any): Promise<AxiosResponse> => {
    try {
      return await Service.post({ url: `/auth/register`, data });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  login: async (data: any): Promise<AxiosResponse> => {
    try {
      return await Service.post({ url: `/auth/login`, data });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default AuthService;
