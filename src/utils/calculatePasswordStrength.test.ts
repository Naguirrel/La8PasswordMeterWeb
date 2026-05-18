import { getPasswordStrength as calculatePasswordStrength } from './passwordStrength';

describe('calculatePasswordStrength', () => {
  it('returns the empty state for an empty password', () => {
    expect(calculatePasswordStrength('')).toEqual({
      score: 0,
      maxScore: 5,
      percentage: 0,
      label: 'Empty',
      missingRules: [
        'minimum-length',
        'lowercase',
        'uppercase',
        'number',
        'special-character',
      ],
    });
  });

  it('treats whitespace-only passwords as empty', () => {
    expect(calculatePasswordStrength('        ')).toMatchObject({
      score: 0,
      percentage: 0,
      label: 'Empty',
    });
  });

  it('detects lowercase without counting uppercase as complete', () => {
    expect(calculatePasswordStrength('password8!')).toMatchObject({
      score: 4,
      percentage: 80,
      label: 'Good',
      missingRules: ['uppercase'],
    });
  });

  it('detects uppercase without counting lowercase as complete', () => {
    expect(calculatePasswordStrength('PASSWORD8!')).toMatchObject({
      score: 4,
      percentage: 80,
      label: 'Good',
      missingRules: ['lowercase'],
    });
  });

  it('requires both uppercase and lowercase for the strongest result', () => {
    expect(calculatePasswordStrength('Password8!')).toEqual({
      score: 5,
      maxScore: 5,
      percentage: 100,
      label: 'Strong',
      missingRules: [],
    });
  });
});
