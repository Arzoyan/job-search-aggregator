import { render, screen, fireEvent } from '@testing-library/react';
import MainSelect from './index';

describe('MainSelect', () => {
    const mockOnChange = jest.fn();
    const options = [
        { label: 'select', value: '' },
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
    ];

    beforeEach(() => {
        render(
            <MainSelect
                value=""
                onChange={mockOnChange}
                options={options}
                placeholder="Select an option"
            />
        );
    });

    test('renders the select with the correct placeholder', () => {
        const selectElement = screen.getByTitle('select');
        expect(selectElement).toBeInTheDocument();
    });

    test('calls onChange with the correct value when an option is selected', () => {
        // Click the select to open the dropdown
        const selectElement = screen.getByRole('combobox');
        fireEvent.mouseDown(selectElement); // Simulate opening the dropdown

        // Select 'Option 2'
        const optionToSelect = screen.getByText('Option 2');
        fireEvent.click(optionToSelect); // Simulate selecting the option

        expect(mockOnChange).toHaveBeenCalledWith('2');
    });

    test('displays the selected value correctly', () => {
        render(
            <MainSelect
                value="2"
                onChange={mockOnChange}
                options={options}
                placeholder="Select an option"
            />
        );

        const selectedValueElement = screen.getByText('Option 2');
        expect(selectedValueElement).toBeInTheDocument();
    });
});
