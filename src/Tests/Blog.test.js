import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import Blog from '../pages/Blog';
import { getDocs } from 'firebase/firestore';

jest.mock('react-router', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

jest.mock('../firebase-config', () => ({
  db: {},
  auth: {
    currentUser: {
      uid: 'test-user-id',
    },
  },
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('Blog Component', () => {
  it('renders a post with title, text, author, and comment count', async () => {
    getDocs.mockResolvedValueOnce({
      docs: [
        {
          id: '1',
          data: () => ({
            title: 'Test Post',
            postText: 'This is a test post.',
            Author: { name: 'Test Author', Id: 'test-user-id' },
            comments: [{ text: 'Nice post!' }, { text: 'Thanks!' }],
          }),
        },
      ],
    });

    render(<Blog isAuth={true} />);

    expect(screen.getByText(/Create a Post/i)).toBeInTheDocument();

    await waitFor(() => {
      const postTitle = screen.getAllByText(/Test Post/i);
      expect(postTitle.length).toBeGreaterThan(0);

      expect(screen.getByText(/This is a test post\./i)).toBeInTheDocument();
      expect(screen.getByText(/@Test Author/i)).toBeInTheDocument();
      expect(screen.getByText(/2 Comments/i)).toBeInTheDocument();
    });
  });
});