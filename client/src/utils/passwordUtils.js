export const checkPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

export const getPasswordStrengthText = (strength) => {
  if (strength <= 2) return 'Weak';
  if (strength <= 3) return 'Medium';
  return 'Strong';
};

export const getPasswordStrengthColor = (strength) => {
  if (strength <= 2) return 'bg-red-500';
  if (strength <= 3) return 'bg-yellow-500';
  return 'bg-green-500';
};