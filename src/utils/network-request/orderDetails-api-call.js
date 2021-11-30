import { baseUrl } from "../constants/EnvUrl";
import { apiCaller } from "./api-call";

function getHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export const orderDetailsApiCaller = {
  getOrderDetails: async function ({ reqBody }) {
    const url = "/order-detail";

    const { response, error, status } = await apiCaller.post({
      url: process.env.NODE_ENV !== "production" ? url : baseUrl + url,
      reqBody,
      headers: getHeader(),
    });

    if (status === 401) {
      return {
        unauthorized: true,
      };
    }

    return {
      response,
      error,
      unauthorized: false,
    };
  },
  editOrderDetail: async function ({ reqBody }) {
    const url = "/order-detail/update";

    const { response, error, status } = await apiCaller.put({
      url: process.env.NODE_ENV !== "production" ? url : baseUrl + url,
      reqBody,
      headers: getHeader(),
    });

    if (status === 401) {
      return {
        unauthorized: true,
      };
    }

    return {
      response,
      error,
      unauthorized: false,
    };
  },
  generateUrls: async function ({ reqBody }) {
    const url = "/order-detail/generate-url";

    const { response, error, status } = await apiCaller.post({
      url: process.env.NODE_ENV !== "production" ? url : baseUrl + url,
      reqBody,
      headers: getHeader(),
    });

    if (status === 401) {
      return {
        unauthorized: true,
      };
    }

    return {
      response,
      error,
      unauthorized: false,
    };
  },
};
