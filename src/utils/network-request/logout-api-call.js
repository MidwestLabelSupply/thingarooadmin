import { baseUrl } from "../constants/EnvUrl";
import { apiCaller } from "./api-call";

function getHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export const logoutApiCaller = {
  logout: async function ({ reqBody }) {
    const url = "/admin/logout";
    const { response, error, status } = await apiCaller.post({
      url: process.env.NODE_ENV === "production" ? baseUrl + url : url,
      reqBody,
      headers: getHeader(),
    });

    return {
      response,
      error,
      status,
    };
  },
};
