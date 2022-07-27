import { apiClient } from "../Client/ApiClient";
import { Endpoints } from "../Endpoints";

const getAccInfo = async () => {
  return await apiClient.get(Endpoints.ACCOUNT + "/all");
};

export { getAccInfo };
