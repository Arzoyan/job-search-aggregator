'use client'; // This indicates it's a client component
import React, { useEffect, useState } from 'react';
import { Button, List, Spin, Alert } from 'antd';
import { IJob } from './types/Job';
import MainInput from './components/mainInput';
import MainSelect from './components/mainSelect';
import { JOB_OPTIONS, PAGE_SIZE } from './utils/constants';
import { fetchJobs } from '@/api/jobsApi';
import MainLoading from './components/MainLoading';


const HomePage = () => {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobType, setJobType] = useState<string>(''); // New filter for job type
  const [loading, setLoading] = useState<boolean | null>(null);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginatedJobs = jobs && jobs.length > 0
    ? jobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    : [];

  useEffect(() => {
    loadJobs(); // Pass true to indicate this is an initial load
  }, []);


  const loadJobs = async () => {

    setLoading(true);
    setError("");
    try {
      const successfulJobs = await fetchJobs(jobTitle, location, jobType);
      setJobs(successfulJobs);

      setCurrentPage(1); // Reset page on initial load

    } catch (err) {

      if (err instanceof Error) { // Type guard to check if err is an instance of Error
        setError(err.message || 'Failed to fetch jobs');
      } else {
        setError('Failed to fetch jobs'); // Fallback for non-Error cases
      }
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  if (loading === null) {
    return <MainLoading />
  }

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
        <Button type='primary' onClick={loadJobs}>Search</Button>
      </div>

      {error ? <Alert message={error} type="error" /> :
        loading ? (
          <div data-testid="loading" style={{
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
                pageSize: PAGE_SIZE,
                total: jobs ? jobs.length : 0,
                current: currentPage
              }}
              renderItem={job => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href={job.applicationUrl}>{job.title} {`${job.salary ? "/ " + job.salary : ""}`}</a>}
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
