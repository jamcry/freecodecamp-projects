import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders new quote button', () => {
  const { getByText } = render(<App />);
  const btnNewQuote = getByText(/new quote/i);
  expect(btnNewQuote).toBeInTheDocument();
});
