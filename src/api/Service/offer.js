import { apiClient } from "../Client/ApiClient";
import { Endpoints } from "../Endpoints";

const getOffers = async () => {
  return await apiClient.get(Endpoints.OFFER);
};

const getTotalOffers = async () => {
  return await apiClient.get(Endpoints.OFFER + "/total");
};

const getRejectedOffers = async () => {
  return await apiClient.get(Endpoints.OFFER + "/rejected");
};

export { getOffers, getTotalOffers, getRejectedOffers };
