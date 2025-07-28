import NewPostCard from '@/components/NewPostCard';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('NewPostCard', () => {
  it('renders the icon and label', () => {
    render(<NewPostCard onClick={() => {}} />);


    const icon = screen.getByTestId('plus-icon');
    expect(icon).toBeInTheDocument();

    const label = screen.getByText(/new post/i);
    expect(label).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
   render(<NewPostCard onClick={() => {}} />);

    const label = screen.getByText(/new post/i);
    const card = label.closest('div');

    expect(card).toHaveClass('border-dashed');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveClass('hover:bg-gray-100');
  });
});
