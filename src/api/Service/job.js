import { apiClient } from "../Client/ApiClient";
import { Endpoints } from "../Endpoints";

const getFinishedJob = async () => {
  return await apiClient.get(Endpoints.JOB + "/count-finished-job");
};

const getJobPerMonth = async () => {
  return await apiClient.get(Endpoints.JOB + "/jobs-per-month");
};

const getJobs = async () => {
  return await apiClient.get(Endpoints.JOBS, {
    params: {
      pageNo: 1,
      pageSize: 10,
    },
  });
};

export { getFinishedJob, getJobs, getJobPerMonth };
