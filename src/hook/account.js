import { useQuery } from "react-query";
import { getAccInfo } from "../api/Service/account";

const useGetAllAccInfo = () => {
  const getAcc = useQuery("all-acc-info", getAccInfo, {});
  return getAcc;
};

export { useGetAllAccInfo };
