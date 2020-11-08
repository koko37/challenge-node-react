import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Contacts title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Contacts/i);
  expect(titleElement).toBeInTheDocument();
});
