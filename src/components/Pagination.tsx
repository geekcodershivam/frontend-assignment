import React from 'react'
import '../styles/pagination.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPrevPage: () => void
  onNextPage: () => void
}

export function Pagination({ currentPage, totalPages, onPrevPage, onNextPage }: PaginationProps) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <button onClick={onPrevPage} disabled={currentPage === 1} aria-label="Go to previous page">
        Previous
      </button>
      <span aria-current="page">
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNextPage} disabled={currentPage === totalPages} aria-label="Go to next page">
        Next
      </button>
    </nav>
  )
}

