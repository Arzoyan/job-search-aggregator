import { IJob } from "@/app/types/Job";
import { MOCK_JOBS_3 } from "@/app/utils/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IJob[]>,
) {
  const { jobType, jobTitle, location } = req.query;

  const filteredJobs = MOCK_JOBS_3.filter((job) => {
    const jobTypeMatch =
      !jobType ||
      (typeof jobType === "string" && jobType && job.type === jobType);

    const titleMatch =
      typeof jobTitle === "string" &&
      jobTitle &&
      job.title.toLowerCase().includes(jobTitle.toLowerCase());

    const locationMatch =
      typeof location === "string" &&
      location &&
      job.location.toLowerCase().includes(location.toLowerCase());

    return jobTypeMatch || titleMatch || locationMatch;
  });
  setTimeout(() => {
    res.status(200).json(filteredJobs);
  }, 1500);
}
