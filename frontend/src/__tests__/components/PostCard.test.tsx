import PostCard from '@/components/PostCard';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('PostCard', () => {
  const mockPost = {
    id: 1,
    title: 'Example Post Title',
    body: 'This is the example post body content.',
  };

  it('renders title and body text', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
  });

  it('renders the delete button', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  it('calls handleDelete when delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(<PostCard post={mockPost} handleDelete={handleDelete} />);
    fireEvent.click(screen.getByTestId('delete-button'));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
