import { apiClient } from "../Client/ApiClient";
import { Endpoints } from "../Endpoints";

const getOffers = async () => {
  return await apiClient.get(Endpoints.OFFER);
};

export { getOffers };
