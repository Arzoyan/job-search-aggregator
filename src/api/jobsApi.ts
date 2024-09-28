import axiosInstance from "./axiosInstance"; // Ensure you import your axiosInstance
import { IJob } from "@/app/types/Job"; // Import your job interface
import { AxiosResponse } from "axios"; // Import AxiosResponse type

export const fetchJobs = async (
  jobTitle: string,
  location: string,
  jobType: string,
): Promise<IJob[]> => {
  const url = `api?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`;
  try {
    const response: AxiosResponse<IJob[]> = await axiosInstance.get<IJob[]>(
      url,
    );
    const results: IJob[] = response.data || response;

    return results; // Return the array of IJob objects
  } catch (error) {
    throw error; // Rethrow the error for handling in your component
  }
};
