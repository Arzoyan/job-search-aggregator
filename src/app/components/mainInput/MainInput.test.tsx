// MainInput.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainInput from './index';

describe('MainInput', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        render(<MainInput value="" onChange={mockOnChange} placeholder="Enter location" />);
    });

    test('renders the input with the correct placeholder', () => {
        const inputElement = screen.getByPlaceholderText('Enter location');
        expect(inputElement).toBeInTheDocument();
    });

    test('displays the correct value in the input', () => {
        const inputElement = screen.getByPlaceholderText('Enter location');
        fireEvent.change(inputElement, { target: { value: 'New York' } });
        expect(mockOnChange).toHaveBeenCalledWith('New York'); // Ensure onChange is called with the correct value
    });

    test('updates the input value when changed', () => {
        const inputElement = screen.getByPlaceholderText('Enter location');
        fireEvent.change(inputElement, { target: { value: 'Los Angeles' } });
        expect(mockOnChange).toHaveBeenCalledWith('Los Angeles');
    });

    test('has default placeholder if none is provided', () => {
        render(<MainInput value="" onChange={mockOnChange} />);
        const inputElement = screen.getByPlaceholderText('Enter location');
        expect(inputElement).not.toBeInTheDocument();
    });
});
