export type PasswordRuleId =
  | 'minimum-length'
  | 'lowercase'
  | 'uppercase'
  | 'number'
  | 'special-character';

export type PasswordStrengthLabel =
  | 'Empty'
  | 'Weak'
  | 'Medium'
  | 'Good'
  | 'Strong';

export type PasswordStrength = {
  score: number;
  maxScore: number;
  percentage: number;
  label: PasswordStrengthLabel;
  missingRules: PasswordRuleId[];
};

const MAX_SCORE = 5;

type PasswordRule = {
  id: PasswordRuleId;
  message: string;
  test: (password: string) => boolean;
};

export const PASSWORD_RULES = [
  {
    id: 'minimum-length',
    message: 'Use at least 8 characters',
    test: (password: string) => password.length >= 8,
  },
  {
    id: 'lowercase',
    message: 'Add a lowercase letter',
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    id: 'uppercase',
    message: 'Add an uppercase letter',
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    id: 'number',
    message: 'Add a number',
    test: (password: string) => /\d/.test(password),
  },
  {
    id: 'special-character',
    message: 'Add a special character',
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
] satisfies PasswordRule[];

export const PASSWORD_RULE_MESSAGES = Object.fromEntries(
  PASSWORD_RULES.map((rule) => [rule.id, rule.message]),
) as Record<PasswordRuleId, string>;

function getStrengthLabel(score: number): PasswordStrengthLabel {
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
      missingRules: PASSWORD_RULES.map((rule) => rule.id),
    };
  }

  const missingRules = PASSWORD_RULES.filter(
    (rule) => !rule.test(normalizedPassword),
  ).map((rule) => rule.id);
  const score = MAX_SCORE - missingRules.length;

  return {
    score,
    maxScore: MAX_SCORE,
    percentage: (score / MAX_SCORE) * 100,
    label: getStrengthLabel(score),
    missingRules,
  };
}

export const getPasswordStrength = calculatePasswordStrength;
