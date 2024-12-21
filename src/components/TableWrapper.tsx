import React, { useState } from 'react'
import { Table } from './Table';
import { Pagination } from './Pagination';

interface TableWrapperProps {
    headers: { title: string, pathColumnName: string }[];
    data: (string | number | undefined)[][];
    caption?: string;
    showPagination?: boolean;
    maxPerPage?: number;
}

export function TableWrapper({ headers = [], data = [], caption = '', showPagination = false, maxPerPage = 5 }: TableWrapperProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const indexOfLast = currentPage * maxPerPage
    const indexOfFirst = indexOfLast - maxPerPage
    const currentData = showPagination ? data?.slice(indexOfFirst, indexOfLast) : data;

    const totalPages = Math.ceil(data?.length / maxPerPage)

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    return (
        <React.Fragment>
            <Table headers={headers} data={currentData} caption={caption} />
            {showPagination && <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
            />}
        </React.Fragment>
    );
}
