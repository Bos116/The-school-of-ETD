import React from 'react';
import { render, screen } from '@testing-library/react';
import Quiz from '../pages/Quiz';

// Mock EngineeringQuiz component
jest.mock('../components/AiQuiz/EngineeringQuiz', () => () => (
  <div data-testid="engineering-quiz">Mock Engineering Quiz</div>
));

describe('Quiz Page', () => {
  test('renders Quiz component and EngineeringQuiz child', () => {
    const { container } = render(<Quiz />);

    // Check container has correct class
    const quizContainer = container.querySelector('.quiz-container');
    expect(quizContainer).toBeInTheDocument();

    // Check EngineeringQuiz mock is rendered
    expect(screen.getByTestId('engineering-quiz')).toBeInTheDocument();
    expect(screen.getByText('Mock Engineering Quiz')).toBeInTheDocument();
  });
});
