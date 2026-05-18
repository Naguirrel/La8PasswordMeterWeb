export type PasswordStrength = {
  score: number;
  maxScore: number;
  percentage: number;
  label: string;
  missingRules: string[];
};

const MAX_SCORE = 5;

const RULES = [
  {
    id: 'minimum-length',
    test: (password: string) => password.length >= 8,
  },
  {
    id: 'lowercase',
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    id: 'uppercase',
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    id: 'number',
    test: (password: string) => /\d/.test(password),
  },
  {
    id: 'special-character',
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
];

function getLabel(score: number): string {
  if (score === 0) {
    return 'Empty';
  }

  if (score <= 2) {
    return 'Weak';
  }

  if (score === 3) {
    return 'Medium';
  }

  if (score === 4) {
    return 'Good';
  }

  return 'Strong';
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  const normalizedPassword = password.trim();

  if (!normalizedPassword) {
    return {
      score: 0,
      maxScore: MAX_SCORE,
      percentage: 0,
      label: 'Empty',
      missingRules: RULES.map((rule) => rule.id),
    };
  }

  const missingRules = RULES.filter((rule) => !rule.test(normalizedPassword)).map(
    (rule) => rule.id,
  );
  const score = MAX_SCORE - missingRules.length;

  return {
    score,
    maxScore: MAX_SCORE,
    percentage: (score / MAX_SCORE) * 100,
    label: getLabel(score),
    missingRules,
  };
}

export const getPasswordStrength = calculatePasswordStrength;
