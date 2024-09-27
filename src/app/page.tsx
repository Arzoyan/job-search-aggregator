'use client'; // This indicates it's a client component
import React, { useEffect, useState } from 'react';
import { Button, List, Spin, Alert } from 'antd';
import { IJob } from './types/Job';
import MainInput from './components/mainInput';
import MainSelect from './components/mainSelect';
import { JOB_OPTIONS } from './utils/constants';

const HomePage = () => {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobType, setJobType] = useState<string>(''); // New filter for job type
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [cachedJobs, setCachedJobs] = useState<{ [key: string]: IJob[] }>({});
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  useEffect(() => {
    handleSearch();
  }, []);


  const handleSearch = async () => {
    const cacheKey = `${jobTitle}-${location}-${jobType}`;
    if (cachedJobs[cacheKey]) {
      setJobs(cachedJobs[cacheKey]);
      setCurrentPage(1);
      return;
    }

    setLoading(true);
    setError('');
    setJobs([]);

    try {
      const responses = await Promise.all([
        fetch(`http://localhost:3000/api/jobs/api1?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`),
        fetch(`http://localhost:3000/api/jobs/api2?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`),
        fetch(`http://localhost:3000/api/jobs/api3?jobTitle=${jobTitle}&location=${location}&jobType=${jobType}`),
      ]);

      const jobsData = await Promise.all(responses.map(res => res.json()));
      const aggregatedJobs: IJob[] = jobsData.flat();

      // Filter jobs based on search input
      const filteredJobs = aggregatedJobs.filter(job => {
        const titleMatch = job.title.toLowerCase().includes(jobTitle.toLowerCase());
        const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());

        const jobTypeMatch = jobType ? job.type === jobType : true; // Make sure to compare the job type correctly

        return titleMatch && locationMatch && jobTypeMatch;
      });

      setJobs(filteredJobs);
      setCachedJobs((prev) => ({ ...prev, [cacheKey]: filteredJobs }));
      setCurrentPage(1);
    } catch (err) {
      setError('Error fetching jobs');
    } finally {
      setLoading(false);
    }
  };
  const paginatedJobs = jobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
        <MainInput
          placeholder="Job Title"
          value={jobTitle}
          onChange={setJobTitle}
        />

        <MainInput
          placeholder="Location"
          value={location}
          onChange={setLocation}
        />

        <MainSelect
          value={jobType}
          onChange={setJobType}
          options={JOB_OPTIONS}
          placeholder="Job Type"
        />
        <Button type='primary' onClick={handleSearch}>Search</Button>
      </div>

      {error && <Alert message={error} type="error" />}
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
        }}>
          <Spin />
        </div>
      )
        :
        <>
          <List
            itemLayout="vertical"
            dataSource={paginatedJobs}
            pagination={{
              position: "bottom",
              align: "end",
              onChange: setCurrentPage,
              pageSize: pageSize,
              total: jobs.length,
              current: currentPage
            }}
            renderItem={job => (
              <List.Item>
                <List.Item.Meta
                  title={<a href={job.applicationUrl}>{job.title} {`${job.salary ? "/" + job.salary : ""}`}</a>}
                  description={`${job.company} / ${job.location} / ${job.postedDate}`}
                />
                <div>{job.description}</div>
              </List.Item>
            )}
          />
        </>
      }
    </div>
  );
};

export default HomePage;
