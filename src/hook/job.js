import { getFinishedJob, getJobPerMonth, getJobs } from "../api/Service/job";

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

const useGetJobPerMonth = () => {
  const jobPerMonth = useQuery("job-per-month", getJobPerMonth, {
    staleTime: 60000,
  });
  return jobPerMonth;
};

export { useGetListJob, useGetDoneJob, useGetJobPerMonth };
