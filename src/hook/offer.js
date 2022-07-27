import { useQuery } from "react-query";
import {
  getOffers,
  getRejectedOffers,
  getTotalOffers,
} from "../api/Service/offer";

const useGetOffers = () => {
  const getListOffers = useQuery("list-offer", getOffers, {
    staleTime: 60000,
  });
  return getListOffers;
};

const useGetTotalOffers = () => {
  const totalOffers = useQuery("total-offer", getTotalOffers, {
    staleTime: 60000,
  });
  return totalOffers;
};

const useGetRejectedOffers = () => {
  const rejected = useQuery("rejected-offer", getRejectedOffers, {
    staleTime: 60000,
  });
  return rejected;
};

export { useGetOffers, useGetTotalOffers, useGetRejectedOffers };
