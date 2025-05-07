// src/Tests/Contact.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../pages/Contact'; // Adjust the path if needed

describe('Contact Page', () => {
  test('renders the ContactForm component', () => {
    render(<Contact />);

    // Assuming your ContactForm has a heading, label, or button we can query
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();

    // Or if there's a submit button, label, etc.
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });
});