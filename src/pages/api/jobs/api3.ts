import { CacheEntry, IJob } from "@/app/types/Job";
import { CACHE_DURATION_MS, MOCK_JOBS_3 } from "@/app/utils/constants";
import { delayResponse } from "@/app/utils/helpers";
import type { NextApiRequest, NextApiResponse } from "next";

const jobCache3: { [key: string]: CacheEntry } = {}; // In-memory cache

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IJob[]>,
) {
  const { jobType, jobTitle, location } = req.query;

  const cacheKey = `${jobType || "any"}-${jobTitle || "any"}-${
    location || "any"
  }`;

  // Check if cached data is available and not expired
  const cachedData = jobCache3[cacheKey];
  const now = Date.now();
  if (cachedData && cachedData.expiration > now) {
    return res.status(200).json(cachedData.data);
  }

  // If no cached data or expired, fetch and cache the results
  const filteredJobs = MOCK_JOBS_3.filter((job) => {
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

  // Cache the result
  jobCache3[cacheKey] = {
    data: filteredJobs,
    expiration: now + CACHE_DURATION_MS,
  };

  const data = await delayResponse(filteredJobs, 1500);
  // Return the filtered jobs with a delay
  return res.status(200).json(data);
}
