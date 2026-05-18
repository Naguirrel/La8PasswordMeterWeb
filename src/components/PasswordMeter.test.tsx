import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordMeter } from './PasswordMeter';

afterEach(() => {
  cleanup();
});

describe('PasswordMeter', () => {
  it('muestra el estado inicial', () => {
    render(<PasswordMeter />);

    expect(screen.getByRole('status')).toHaveTextContent('Sin password');
  });

  it('actualiza la fuerza cuando el usuario escribe', async () => {
    const user = userEvent.setup();
    render(<PasswordMeter />);

    await user.type(screen.getByLabelText('Password'), 'StrongPass8!');

    expect(screen.getByRole('status')).toHaveTextContent('Fuerte');
  });
});
