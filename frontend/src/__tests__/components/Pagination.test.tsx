import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/Pagination';

describe('Pagination', () => {
  it('renders correct page numbers when totalPages <= 5', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('renders ellipses when totalPages > 5', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={6} totalPages={10} onPageChange={onPageChange} />);

    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={10} onPageChange={onPageChange} />);

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={10} totalPages={10} onPageChange={onPageChange} />);

    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('calls onPageChange with correct page when number clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={10} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText('4'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange when Previous/Next clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={10} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
