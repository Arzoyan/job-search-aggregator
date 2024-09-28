import { IJob } from "../types/Job";

export const JOB_OPTIONS = [
  { label: "All", value: "" },
  { label: "Frontend", value: "FRONT_END" },
  { label: "Backend", value: "BACK_END" },
  { label: "Full Stack", value: "FULL_STACK" },
];

export const MOCK_JOBS_1: IJob[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Frontend Developer...",
    salary: "$80,000 - $120,000",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/1",
    type: "FRONT_END",
  },
  {
    id: "11",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Frontend Developer...",
    salary: "$80,000 - $120,000",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/11",
    type: "FRONT_END",
  },
  {
    id: "12",
    title: "Frontend Developer",
    company: "DataSystems",
    location: "New York, NY",
    description: "Seeking an experienced Frontend Developer...",
    salary: "$290,000 - $330,000",
    postedDate: "2024-09-14",
    applicationUrl: "https://example.com/apply/2",
    type: "FRONT_END",
  },
  {
    id: "13",
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "San Francisco, CA",
    description: "Join our team as a Full Stack Developer...",
    salary: "$100,000 - $150,000",
    postedDate: "2024-09-13",
    applicationUrl: "https://example.com/apply/3",
    type: "FULL_STACK",
  },
];

export const MOCK_JOBS_2: IJob[] = [
  {
    id: "2",
    title: "Backend Engineer ",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Backend Engineer...",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/2",
    type: "BACK_END",
  },
  {
    id: "22",
    title: "Backend Engineer ",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Backend Engineer...",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/22",
    type: "BACK_END",
  },
  {
    id: "222",
    title: "Backend Engineer ",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Backend Engineer...",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/222",
    type: "BACK_END",
  },
  {
    id: "262",
    title: "Backend Engineer ",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Backend Engineer...",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/222",
    type: "BACK_END",
  },
  {
    id: "26236",
    title: "Backend Engineer ",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Backend Engineer...",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/222",
    type: "BACK_END",
  },
];

export const MOCK_JOBS_3: IJob[] = [
  {
    id: "3",
    title: "Full Stack Developer",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Full Stack Developer...",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/3",
    type: "FULL_STACK",
  },
  {
    id: "33",
    title: "Full Stack Developer",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Full Stack Developer...",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/33",
    type: "FULL_STACK",
  },
  {
    id: "1444",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    description: "We are looking for a skilled Frontend Developer...",
    salary: "$80,000 - $120,000",
    postedDate: "2024-09-15",
    applicationUrl: "https://example.com/apply/1444",
    type: "FRONT_END",
  },
];

export const CACHE_DURATION_MS = 1 * 60 * 1000; // Cache duration: 5 minutes

export const PAGE_SIZE = 5;
