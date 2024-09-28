import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './page';
import { fetchJobs } from '@/api/jobsApi';

const mockJobs = [
    {
        id: "1",
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'Remote',
        postedDate: '2023-09-01',
        description: 'An exciting opportunity...',
        applicationUrl: '#',
        salary: '80k - 100k',
        type: 'SOFTWARE_ENGINEER',
    },
    {
        id: "2",
        title: 'Frontend Developer',
        company: 'Design Corp',
        location: 'New York',
        postedDate: '2023-09-02',
        description: 'Frontend development work...',
        applicationUrl: '#',
        salary: '60k - 80k',
        type: 'FRONT_END',
    },
    {
        id: "3",
        title: 'Backend Developer',
        company: 'Dev Corp',
        location: 'San Francisco',
        postedDate: '2023-09-03',
        description: 'Backend development position...',
        applicationUrl: '#',
        salary: '70k - 90k',
        type: 'BACK_END',
    },
    {
        id: "4",
        title: 'Full Stack Developer',
        company: 'Startup Inc',
        location: 'Los Angeles',
        postedDate: '2023-09-04',
        description: 'Full stack development role...',
        applicationUrl: '#',
        salary: '90k - 110k',
        type: 'FULL_STACK',
    },
    {
        id: "5",
        title: 'QA Engineer',
        company: 'Testing Co',
        location: 'Seattle',
        postedDate: '2023-09-05',
        description: 'Quality assurance position...',
        applicationUrl: '#',
        salary: '50k - 70k',
        type: 'QA_ENGINEER',
    },
    {
        id: "6",
        title: 'DevOps Engineer',
        company: 'Ops Corp',
        location: 'Austin',
        postedDate: '2023-09-06',
        description: 'DevOps engineer needed...',
        applicationUrl: '#',
        salary: '85k - 105k',
        type: 'DEVOPS_ENGINEER',
    },
];
// Mock the fetchJobs function
jest.mock('@/api/jobsApi', () => ({
    fetchJobs: jest.fn(() => Promise.resolve(mockJobs)),
}));

describe('HomePage', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    })

    test('renders input fields and search button', () => {
        render(<HomePage />);

        expect(screen.getByPlaceholderText('Job Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Location')).toBeInTheDocument();
        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    });


    test('displays loading spinner while fetching jobs', async () => {
        (fetchJobs as jest.Mock).mockResolvedValueOnce([]); // Mock API response

        render(<HomePage />);

        // Simulate clicking the search button
        fireEvent.click(screen.getByRole('button', { name: /Search/i }));

        // The loading spinner should appear when the search button is clicked
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    test('displays jobs after fetching', async () => {
        render(<HomePage />);

        fireEvent.click(screen.getByRole('button', { name: /Search/i }));

        // Check that loading spinner is displayed
        expect(screen.getByTestId('loading')).toBeInTheDocument();

        // Wait for the loading spinner to disappear
        await waitFor(() => {
            expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        });

        // Wait for the job list to appear
        await waitFor(() => {
            screen.debug();
            expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
            expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
            expect(screen.getByText(/Remote/i)).toBeInTheDocument();
            expect(screen.getByText(/2023-09-01/i)).toBeInTheDocument();
        });
    });

    test('handles pagination correctly', async () => {
        render(<HomePage />);

        // Simulate clicking the search button to fetch jobs
        fireEvent.click(screen.getByRole('button', { name: /Search/i }));

        // Check that loading spinner is displayed
        expect(screen.getByTestId('loading')).toBeInTheDocument();

        // Wait for the loading spinner to disappear
        await waitFor(() => {
            expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        });

        // Check that jobs are displayed after loading
        await waitFor(() => {
            expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
            expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
            expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
            expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
            expect(screen.getByText(/QA Engineer/i)).toBeInTheDocument();
        });

        // Simulate clicking on the pagination button for page 2
        fireEvent.click(screen.getByTitle('2'));

        // Here we assume that the pagination will show the last job in the second page
        await waitFor(() => {
            expect(screen.getByText('DevOps Engineer / 85k - 105k')).toBeInTheDocument(); // Assuming it shows the 6th job
        });
    });


});
