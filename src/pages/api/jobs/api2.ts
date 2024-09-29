import { CacheEntry, IJob } from "@/app/types/Job";
import { CACHE_DURATION_MS, MOCK_JOBS_2 } from "@/app/utils/constants";
import { delayResponse } from "@/app/utils/helpers";
import type { NextApiRequest, NextApiResponse } from "next";

const jobCache2: { [key: string]: CacheEntry } = {}; // In-memory cache

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IJob[]>,
) {
  const { jobType, jobTitle, location } = req.query;

  const cacheKey = `${jobType || "any"}-${jobTitle || "any"}-${
    location || "any"
  }`;

  const now = Date.now();

  // Check if cached data is available and not expired
  const cachedData = jobCache2[cacheKey];
  if (cachedData && cachedData.expiration > now) {
    // If cache exists, return cached data with a delay
    return res.status(200).json(await delayResponse(cachedData.data, 3000));
  }

  // If no cache or cache expired, filter jobs
  const filteredJobs = MOCK_JOBS_2.filter((job) => {
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

  // Cache the filtered result
  jobCache2[cacheKey] = {
    data: filteredJobs,
    expiration: now + CACHE_DURATION_MS,
  };
  const data = await delayResponse(filteredJobs, 3000);
  return res.status(200).json(data);
}
