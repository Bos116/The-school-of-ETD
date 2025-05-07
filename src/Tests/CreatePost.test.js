// src/Tests/CreatePost.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from '../pages/CreatePost'; // adjust path if needed
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router';

// 🔧 Mock firebase and react-router
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

// Mock auth object
jest.mock('../firebase-config', () => ({
  db: {},
  auth: {
    currentUser: {
      displayName: 'Test User',
      uid: '123',
    },
  },
}));

describe('CreatePost Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    collection.mockReturnValue('mocked-collection');
  });

  test('renders form inputs and submit button', () => {
    render(<CreatePost isAuth={true} />);

    expect(screen.getByText(/create a post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/post/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit post/i })).toBeInTheDocument();
  });

  test('submits form and navigates home', async () => {
    addDoc.mockResolvedValueOnce({ id: 'mocked-post-id' });

    render(<CreatePost isAuth={true} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Technology' } });
    fireEvent.change(screen.getByLabelText(/post/i), { target: { value: 'This is a test post.' } });

    fireEvent.click(screen.getByRole('button', { name: /submit post/i }));

    expect(addDoc).toHaveBeenCalledWith('mocked-collection', expect.objectContaining({
      title: 'Test Title',
      postText: 'This is a test post.',
      category: 'Technology',
      Author: {
        name: 'Test User',
        Id: '123',
      },
    }));

    // Wait for navigation to be called after addDoc
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
  });
});