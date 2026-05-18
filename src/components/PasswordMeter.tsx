import { useMemo, useState } from 'react';
import { getPasswordStrength } from '../utils/passwordStrength';

export function PasswordMeter() {
  const [password, setPassword] = useState('');
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  return (
    <form className="password-meter" aria-label="Medidor de password">
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Escribe un password"
      />
      <meter
        aria-label="Fuerza del password"
        min={0}
        max={4}
        value={strength.score}
      />
      <p role="status">{strength.label}</p>
    </form>
  );
}
