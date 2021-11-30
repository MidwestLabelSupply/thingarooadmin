import axios from "axios";

export const apiCaller = {
  get: async function ({ url, headers }) {
    try {
      const response = await axios.get(url, { headers });
      // console.log("api", response);
      return {
        response: response.data,
        error: false,
        status: response.status,
      };
    } catch (error) {
      // console.log("apiError", error);
      return {
        response: error.response.data,
        error: true,
        status: error.response.status,
      };
    }
  },
  post: async function ({ url, reqBody, headers }) {
    try {
      const response = await axios.post(url, reqBody, { headers });
      // console.log("api", response);
      return {
        response: response.data,
        error: false,
        status: response.status,
      };
    } catch (error) {
      // console.log("apiError", error);
      return {
        response: error.response.data,
        error: true,
        status: error.response.status,
      };
    }
  },
  put: async function ({ url, reqBody, headers }) {
    try {
      const response = await axios.put(url, reqBody, { headers });
      // console.log("api", response);
      return {
        response: response.data,
        error: false,
        status: response.status,
      };
    } catch (error) {
      // console.log("apiError", error);
      return {
        response: error.response.data,
        error: true,
        status: error.response.status,
      };
    }
  },
  delete: async function ({ url, reqBody, headers }) {
    try {
      const response = await axios.delete(url, { data: reqBody, headers });
      // console.log("api", response);
      return {
        response: response.data,
        error: false,
        status: response.status,
      };
    } catch (error) {
      // console.log("apiError", error);
      return {
        response: error.response.data,
        error: true,
        status: error.response.status,
      };
    }
  },
};
