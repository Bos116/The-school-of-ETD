import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home'; // adjust path based on file location

describe('Home Page', () => {
  test('renders header title and dynamic cards', () => {
    render(<Home />);

     // Check that the main header is rendered
     expect(screen.getByText(/Welcome to The School of engineering/i)).toBeInTheDocument();

     // Check card headings (use getAllByText or getByRole for more precision)
     expect(screen.getByText(/Why Christ Church University\?/i)).toBeInTheDocument();
 
     // Fix for duplicate text issue: check heading specifically
     expect(screen.getAllByText(/Our Courses/i)[0]).toBeInTheDocument(); // or:
     expect(screen.getByRole('heading', { name: /Our Courses/i })).toBeInTheDocument();
 
     // Check for the button text
     expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });
});



