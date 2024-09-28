import axiosInstance from "./axiosInstance"; // Ensure you import your axiosInstance
import { IJob } from "@/app/types/Job"; // Import your job interface
import { AxiosResponse } from "axios"; // Import AxiosResponse type

export const fetchJobs = async (
  jobTitle: string,
  location: string,
  jobType: string,
): Promise<IJob[]> => {
  const url1 = `api1?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`;
  const url2 = `api2?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`;
  const url3 = `api3?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`;

  try {
    const results = await Promise.allSettled([
      axiosInstance.get<IJob[]>(url1), // Specify the expected response type
      axiosInstance.get<IJob[]>(url2), // Specify the expected response type
      axiosInstance.get<IJob[]>(url3), // Specify the expected response type
    ]);

    const successfulResponses = results
      .filter(
        (result): result is PromiseFulfilledResult<AxiosResponse<IJob[]>> =>
          result.status === "fulfilled",
      )
      .flatMap((result) => result.value.data || result.value); // Access the `data` property to get IJob array

    return successfulResponses; // Return the array of IJob objects
  } catch (error) {
    throw error; // Rethrow the error for handling in your component
  }
};
