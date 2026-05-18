import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordMeter as PasswordStrengthMeter } from './PasswordMeter';

afterEach(() => {
  cleanup();
});

describe('PasswordStrengthMeter', () => {
  it('renders the password field, progress bar, and empty state', () => {
    render(<PasswordStrengthMeter />);

    expect(
      screen.getByRole('form', { name: 'Password strength meter' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Password strength' }),
    ).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getByRole('status')).toHaveTextContent('Empty');
  });

  it('exposes accessible progress values while typing', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);

    await user.type(screen.getByLabelText('Password'), 'Password8!');

    expect(
      screen.getByRole('progressbar', { name: 'Password strength' }),
    ).toHaveAccessibleName('Password strength');
    expect(
      screen.getByRole('progressbar', { name: 'Password strength' }),
    ).toHaveAttribute('aria-valuemin', '0');
    expect(
      screen.getByRole('progressbar', { name: 'Password strength' }),
    ).toHaveAttribute('aria-valuemax', '100');
    expect(
      screen.getByRole('progressbar', { name: 'Password strength' }),
    ).toHaveAttribute('aria-valuenow', '100');
  });

  it('handles whitespace-only input as an edge case', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);

    await user.type(screen.getByLabelText('Password'), '        ');

    expect(screen.getByRole('status')).toHaveTextContent('Empty');
    expect(
      screen.getByRole('progressbar', { name: 'Password strength' }),
    ).toHaveAttribute('aria-valuenow', '0');
  });

  it('asks for an uppercase letter when the password only has lowercase letters', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);

    await user.type(screen.getByLabelText('Password'), 'password8!');

    expect(screen.getByRole('status')).toHaveTextContent('Good');
    expect(screen.getByText('Add an uppercase letter')).toBeInTheDocument();
    expect(screen.queryByText('Add a lowercase letter')).not.toBeInTheDocument();
  });

  it('asks for a lowercase letter when the password only has uppercase letters', async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter />);

    await user.type(screen.getByLabelText('Password'), 'PASSWORD8!');

    expect(screen.getByRole('status')).toHaveTextContent('Good');
    expect(screen.getByText('Add a lowercase letter')).toBeInTheDocument();
    expect(screen.queryByText('Add an uppercase letter')).not.toBeInTheDocument();
  });
});
