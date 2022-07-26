import { getFinishedJob, getJobs } from "../api/Service/job";

const { useQuery } = require("react-query");

const useGetListJob = () => {
  const getListJob = useQuery("list-job", getJobs, {
    staleTime: 60000,
  });
  return getListJob;
};

const useGetDoneJob = () => {
  const getDoneJob = useQuery("done-job", getFinishedJob, {
    staleTime: 60000,
  });
  return getDoneJob;
};

export { useGetListJob, useGetDoneJob };
