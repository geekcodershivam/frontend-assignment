import React from 'react';
import '../styles/table.css';

interface TableProps {
    headers: { title: string, pathColumnName: string }[];
    data: any[];
    caption?: string;
}

export function Table({ headers = [], data = [], caption = '' }: TableProps) {
    return (
        <div className="table-container">
            <table className="custom-table" role="table" aria-label={caption || "Data table"}>
                {caption && <caption>{caption}</caption>}
                <thead>
                    <tr>
                        {headers?.map((header, index) => (
                            <th key={index} scope="col">{header?.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, cellIdx) => {
                                return <td key={rowIndex + cellIdx}>{row?.[header?.pathColumnName]}</td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

