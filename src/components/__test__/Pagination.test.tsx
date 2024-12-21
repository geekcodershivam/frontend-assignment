import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const mockPrevPage = jest.fn();
  const mockNextPage = jest.fn();

  it('renders without crashing', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={5} onPrevPage={mockPrevPage} onNextPage={mockNextPage} />
    );
    expect(container.firstChild).toHaveClass('pagination');
  });

  it('disables previous button on first page', () => {
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={5} onPrevPage={mockPrevPage} onNextPage={mockNextPage} />
    );
    expect(getByText('Previous')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const { getByText } = render(
      <Pagination currentPage={5} totalPages={5} onPrevPage={mockPrevPage} onNextPage={mockNextPage} />
    );
    expect(getByText('Next')).toBeDisabled();
  });

  it('calls onPrevPage when previous button is clicked', () => {
    const { getByText } = render(
      <Pagination currentPage={2} totalPages={5} onPrevPage={mockPrevPage} onNextPage={mockNextPage} />
    );
    fireEvent.click(getByText('Previous'));
    expect(mockPrevPage).toHaveBeenCalled();
  });

  it('calls onNextPage when next button is clicked', () => {
    const { getByText } = render(
      <Pagination currentPage={2} totalPages={5} onPrevPage={mockPrevPage} onNextPage={mockNextPage} />
    );
    fireEvent.click(getByText('Next'));
    expect(mockNextPage).toHaveBeenCalled();
  });
});
