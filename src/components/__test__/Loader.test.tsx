import React from 'react';
import { render } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loading', () => {
  it('renders without crashing', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass('loading-container');
  });

  it('contains a loading spinner', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});

