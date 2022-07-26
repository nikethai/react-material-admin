import { apiClient } from "../Client/ApiClient";
import { Endpoints } from "../Endpoints";
import qs from "qs";

export const login = async (idToken) => {
  return apiClient.post(
    Endpoints.LOGIN,
    qs.stringify({ idToken, role: "admin" }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );
};
