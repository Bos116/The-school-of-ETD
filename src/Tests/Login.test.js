import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { signInWithPopup } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  signInWithPopup: jest.fn(),
}));

jest.mock('../firebase-config', () => ({
  auth: {},
  provider: {},
}));

const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  it('renders login button and handles sign-in flow', async () => {
    const setIsAuth = jest.fn();

    signInWithPopup.mockResolvedValueOnce({ user: { displayName: 'Test User' } });

    render(<Login setIsAuth={setIsAuth} />);

    expect(screen.getByText(/Log in to Google to continue/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(setIsAuth).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});