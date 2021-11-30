import { apiCaller } from "./api-call";
import { baseUrl } from "../constants/EnvUrl";

export const loginApiCaller = {
  login: async function ({ reqBody }) {
    const url = "/admin/login";
    const { response, error, status } = await apiCaller.post({
      url: process.env.NODE_ENV === "production" ? baseUrl + url : url,
      reqBody,
    });

    if (!error) {
      localStorage.setItem("token", response.token);
    }

    return {
      response,
      error,
      status,
    };
  },
};
