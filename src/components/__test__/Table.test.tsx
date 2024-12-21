import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table } from '../Table';
import { data, headers } from './mockData/tableData';


describe('Table component', () => {
    test('renders table with headers and data', () => {
        render(<Table headers={headers} data={data} caption="Sample Table" />);
        expect(screen.getByText('Sample Table')).toBeInTheDocument();
        headers.forEach((header) => {
            expect(screen.getByText(header.title)).toBeInTheDocument();
        });
        data.forEach((row) => {
            const val = row['percentage.funded']
            expect(screen.getByText(val)).toBeInTheDocument();
        });
    });

    test('renders table without caption', () => {
        render(<Table headers={headers} data={data} />);
        expect(screen.getByRole('table', { name: 'Data table' })).toBeInTheDocument();
        expect(screen.queryByText('Sample Table')).not.toBeInTheDocument();
    });

    test('renders empty table when no data is provided', () => {
        render(<Table headers={headers} data={[]} caption="Empty Table" />);
        expect(screen.getByText('Empty Table')).toBeInTheDocument();
        headers.forEach((header) => {
            expect(screen.getByText(header.title)).toBeInTheDocument();
        });
        expect(screen.queryByRole('cell')).not.toBeInTheDocument();
    });

    test('does not render caption when not provided', () => {
        render(<Table headers={headers} data={data} />);
        expect(screen.queryByRole('caption')).not.toBeInTheDocument();
    });

    test('handles undefined data gracefully', () => {
        render(<Table headers={headers} data={[]} caption="Undefined Data Table" />);
        expect(screen.getByText('Undefined Data Table')).toBeInTheDocument();
        expect(screen.queryByRole('cell')).not.toBeInTheDocument();
    });

    test('renders empty table when headers are empty', () => {
        render(<Table headers={[]} data={data} caption="No Headers Table" />);
        expect(screen.getByText('No Headers Table')).toBeInTheDocument();
        expect(screen.queryByRole('columnheader')).not.toBeInTheDocument();
    });

    test('renders correct number of rows', () => {
        render(<Table headers={headers} data={data} />);
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(data.length + 1);
    });

    test('renders all cell values correctly', () => {
        render(<Table headers={headers} data={data} />);
        data.forEach((row) => {
            Object.values(row).forEach((value) => {
                expect(screen.getByText(value.toString())).toBeInTheDocument();
            });
        });
    });

    test('applies correct aria-label to table when caption is provided', () => {
        render(<Table headers={headers} data={data} caption="Test Caption" />);
        expect(screen.getByRole('table', { name: 'Test Caption' })).toBeInTheDocument();
    });

    test('handles data with missing values', () => {
        const incompleteData = [
            { 's.no': 0, 'percentage.funded': null, 'amt.pledged': undefined },
            { 's.no': 1, 'percentage.funded': 8, 'amt.pledged': 6859 },
        ];
        render(<Table headers={headers} data={incompleteData} />);
        expect(screen.getByText('8')).toBeInTheDocument();
        expect(screen.getByText('6859')).toBeInTheDocument();
    });

    test('renders headers with correct scope attribute', () => {
        render(<Table headers={headers} data={data} />);
        const headerCells = screen.getAllByRole('columnheader');
        headerCells.forEach((cell) => {
            expect(cell).toHaveAttribute('scope', 'col');
        });
    });

});
