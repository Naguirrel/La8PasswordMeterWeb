import { useMemo, useState } from 'react';
import {
  PASSWORD_RULE_MESSAGES,
  calculatePasswordStrength,
  type PasswordStrengthLabel,
} from '../utils/passwordStrength';

type StrengthTone = 'empty' | 'weak' | 'medium' | 'good' | 'strong';

const STRENGTH_TONES: Record<PasswordStrengthLabel, StrengthTone> = {
  Empty: 'empty',
  Weak: 'weak',
  Medium: 'medium',
  Good: 'good',
  Strong: 'strong',
};

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('');
  const passwordStrength = useMemo(
    () => calculatePasswordStrength(password),
    [password],
  );
  const strengthTone = STRENGTH_TONES[passwordStrength.label];
  const progressText = `${passwordStrength.label}: ${passwordStrength.percentage}%`;

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
        aria-valuenow={passwordStrength.percentage}
        aria-valuetext={progressText}
        className="password-meter__progress"
        data-strength={strengthTone}
        role="progressbar"
      >
        <span
          className="password-meter__progress-fill"
          style={{ width: `${passwordStrength.percentage}%` }}
        />
      </div>
      <p role="status">{passwordStrength.label}</p>
      {passwordStrength.missingRules.length > 0 ? (
        <ul aria-label="Missing password rules">
          {passwordStrength.missingRules.map((rule) => (
            <li key={rule}>{PASSWORD_RULE_MESSAGES[rule]}</li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
