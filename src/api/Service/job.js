import { apiClient } from "../Client/ApiClient";
import { Endpoints } from "../Endpoints";

const getFinishedJob = async () => {
  return await apiClientt.get(Endpoints.JOB + "/count-finished-job");
};

const getJobs = async () => {
  return await apiClient.get(Endpoints.JOBS);
};

export { getFinishedJob, getJobs };
