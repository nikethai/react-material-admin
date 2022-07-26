import { useQuery } from "react-query";
import { getOffers } from "../api/Service/offer";

const useGetOffers = () => {
  const getListOffers = useQuery("list-offer", getOffers, {
    staleTime: 60000,
  });
  return getListOffers;
};

export { useGetOffers };
