import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure jest-dom is imported for matchers
import Gago from './Gago';

test('renders Gago mago text', () => {
    render(<Gago />);
    const headingElement = screen.getByText('Gago mago');
    expect(headingElement).toBeInTheDocument(); // Uses jest-dom matcher
});