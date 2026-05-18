export type PasswordStrength = {
  score: number;
  label: string;
};

export function getPasswordStrength(password: string): PasswordStrength {
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const score = checks.filter(Boolean).length;

  if (!password) {
    return { score: 0, label: 'Sin password' };
  }

  if (score <= 2) {
    return { score, label: 'Debil' };
  }

  if (score <= 4) {
    return { score, label: 'Buena' };
  }

  return { score: 4, label: 'Fuerte' };
}
