import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TableWrapper } from '../TableWrapper';
import { data, headers } from './mockData/tableData';

describe('TableWrapper Component', () => {
    test('renders table with headers and data', () => {
        render(<TableWrapper headers={headers} data={data} caption="Test Table" />);

        expect(screen.getByText('Test Table')).toBeInTheDocument();
        headers.forEach(header => {
            expect(screen.getByText(header.title)).toBeInTheDocument();
        });
        data.forEach((row) => {
            const val = row['s.no']
            expect(screen.getByText(val)).toBeInTheDocument();
        });
    });

    test('renders pagination when showPagination is true', () => {
        render(<TableWrapper headers={headers} data={data} showPagination={true} maxPerPage={2} />);

        expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Previous')).toBeInTheDocument();
    });

    test('handles pagination correctly', () => {
        render(<TableWrapper headers={headers} data={data} showPagination={true} maxPerPage={2} />);

        expect(screen.getByText(0)).toBeInTheDocument();
        expect(screen.getByText(1)).toBeInTheDocument();
        expect(screen.queryByText(2)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Next'));
        expect(screen.getByText(2)).toBeInTheDocument();
        expect(screen.getByText(3)).toBeInTheDocument();
        expect(screen.queryByText(0)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Next'));
        expect(screen.getByText(4)).toBeInTheDocument();
        expect(screen.getByText(5)).toBeInTheDocument();
        expect(screen.queryByText(2)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Previous'));
        expect(screen.getByText(2)).toBeInTheDocument();
        expect(screen.getByText(3)).toBeInTheDocument();
    });

    test('does not render pagination when showPagination is false', () => {
        render(<TableWrapper headers={headers} data={data} showPagination={false} />);

        expect(screen.queryByText('Next')).not.toBeInTheDocument();
        expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    });
    test('displays correct data based on maxPerPage', () => {
        render(<TableWrapper headers={headers} data={data} showPagination={true} maxPerPage={3} />);

        expect(screen.getByText(0)).toBeInTheDocument();
        expect(screen.getByText(1)).toBeInTheDocument();
        expect(screen.getByText(2)).toBeInTheDocument();
        expect(screen.queryByText(3)).not.toBeInTheDocument();
    });
});
