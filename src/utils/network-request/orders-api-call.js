import { baseUrl } from "../constants/EnvUrl";
import { apiCaller } from "./api-call";

function getHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export const ordersApiCaller = {
  getOrder: async function ({ reqBody }) {
    const url = "/order/admin";

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
  getOrders: async function () {
    const url = "/order";

    const { response, error, status } = await apiCaller.get({
      url: process.env.NODE_ENV !== "production" ? url : baseUrl + url,
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
  addOrder: async function ({ reqBody }) {
    const url = "/order/add";

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
  editOrder: async function ({ reqBody }) {
    const url = "/order/update";

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
  deleteOrder: async function ({ reqBody }) {
    const url = "/order/delete";

    const { response, error, status } = await apiCaller.delete({
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
