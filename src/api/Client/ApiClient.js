import axios from "axios";
import qs from 'qs'
import { axiosInterceptor } from "./ApiInterceptor";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_DOMAIN}`,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
});

const apiClient = axiosInterceptor(axiosClient);

export { apiClient };
