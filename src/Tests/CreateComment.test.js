import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CommentPage from '../pages/CreateComment';
import { useParams, useNavigate } from 'react-router';
import { getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebase-config';

// Mocks
jest.mock('react-router', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../firebase-config', () => ({
  db: {},
  auth: {
    currentUser: {
      displayName: 'Test User',
    },
  },
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn((data) => data),
}));

describe('CommentPage Component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ postId: '123' });
    useNavigate.mockReturnValue(jest.fn());
  });

  it('renders post and handles comment submission', async () => {
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        title: 'Test Post',
        postText: 'This is a post body.',
        comments: [
          { author: 'Alice', text: 'Nice post!' },
          { author: 'Bob', text: 'I agree!' },
        ],
      }),
    });

    render(<CommentPage />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Test Post/i)).toBeInTheDocument();
      expect(screen.getByText(/Nice post!/i)).toBeInTheDocument();
      expect(screen.getByText(/I agree!/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Add a comment/i), {
      target: { value: 'New comment' },
    });

    fireEvent.click(screen.getByText(/Submit Comment/i));

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalled();
    });
  });
});