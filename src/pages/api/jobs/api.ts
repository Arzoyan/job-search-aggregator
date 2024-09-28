import { CacheEntry, IJob } from "@/app/types/Job";
import { CACHE_DURATION_MS } from "@/app/utils/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";

const jobCache: { [key: string]: CacheEntry } = {}; // In-memory cache
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

console.log("Base URL:", baseUrl); // Log the base URL
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IJob[]>,
) {
  const { jobType, jobTitle, location } = req.query;

  const cacheKey = `${jobType || "any"}-${jobTitle || "any"}-${
    location || "any"
  }`;
  const cachedData = jobCache[cacheKey];
  const now = Date.now();

  if (cachedData && cachedData.expiration > now) {
    return res.status(200).json(cachedData.data);
  }

  const apiUrls = [
    `${baseUrl}/api/jobs/api1?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`,
    `${baseUrl}/api/jobs/api2?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`,
    `${baseUrl}/api/jobs/api3?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`,
  ];

  const results: PromiseSettledResult<AxiosResponse<IJob[], []>>[] =
    await Promise.allSettled(
      apiUrls.map((item) => axios.get<IJob[]>(item, { timeout: 2000 })),
    );

  const allFetchedJobs = results
    .filter(
      (result): result is PromiseFulfilledResult<AxiosResponse<IJob[]>> =>
        result.status === "fulfilled",
    )
    .flatMap((result) => result.value.data || result.value); // Access the `data` property to get IJob array

  const filteredJobs = allFetchedJobs.filter((job) => {
    const jobTypeMatch =
      !jobType ||
      (typeof jobType === "string" &&
        job.type.toLowerCase() === jobType.toLowerCase());
    const titleMatch =
      !jobTitle ||
      (typeof jobTitle === "string" &&
        job.title.toLowerCase().includes(jobTitle.toLowerCase()));
    const locationMatch =
      !location ||
      (typeof location === "string" &&
        job.location.toLowerCase().includes(location.toLowerCase()));

    return jobTypeMatch && titleMatch && locationMatch;
  });

  // Cache the combined results
  jobCache[cacheKey] = {
    data: filteredJobs,
    expiration: now + CACHE_DURATION_MS,
  };

  return res.status(200).json(filteredJobs);
}
