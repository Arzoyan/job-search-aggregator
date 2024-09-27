'use client'; // This indicates it's a client component
import React, { useEffect, useState } from 'react';
import { Button, List, Spin, Alert } from 'antd';
import { IJob } from './types/Job';
import MainInput from './components/mainInput';
import MainSelect from './components/mainSelect';
import { JOB_OPTIONS, PAGE_SIZE } from './utils/constants';
import { fetchJobs } from '@/api/jobsApi';


const HomePage = () => {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobType, setJobType] = useState<string>(''); // New filter for job type
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginatedJobs = jobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    const test = setTimeout(() => {
      loadJobs(); // Pass true to indicate this is an initial load
    }, 10)

    return () => {
      clearTimeout(test)
    }
  }, []);


  const loadJobs = async () => {

    setLoading(true);
    setError(null);
    try {
      const successfulJobs = await fetchJobs(jobTitle, location, jobType);
      setJobs(successfulJobs);

      setCurrentPage(1); // Reset page on initial load

    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

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
              pageSize: PAGE_SIZE,
              total: jobs.length,
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
