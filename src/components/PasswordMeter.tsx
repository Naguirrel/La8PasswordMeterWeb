import { useMemo, useState } from 'react';
import { getPasswordStrength } from '../utils/passwordStrength';

const RULE_MESSAGES: Record<string, string> = {
  'minimum-length': 'Use at least 8 characters',
  lowercase: 'Add a lowercase letter',
  uppercase: 'Add an uppercase letter',
  number: 'Add a number',
  'special-character': 'Add a special character',
};

export function PasswordMeter() {
  const [password, setPassword] = useState('');
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  return (
    <form className="password-meter" aria-label="Password strength meter">
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Escribe un password"
      />
      <div
        aria-label="Password strength"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={strength.percentage}
        className="password-meter__progress"
        role="progressbar"
      />
      <p role="status">{strength.label}</p>
      {strength.missingRules.length > 0 ? (
        <ul aria-label="Missing password rules">
          {strength.missingRules.map((rule) => (
            <li key={rule}>{RULE_MESSAGES[rule]}</li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
