// Validation functions for authentication input fields

export const validateName = (name) => {
  return {
    valid: name.length >= 2,
    message: 'Name must be at least 2 characters'
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    valid: emailRegex.test(email),
    message: 'Please enter a valid email address'
  };
};

export const validatePassword = (password) => {
  return {
    valid: password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password),
    message: 'Password must meet all requirements'
  };
};

export const validateOccupation = (occupation) => {
  return {
    valid: occupation !== '',
    message: 'Please select an occupation'
  };
};

export const getPasswordValidations = (password) => {
  return [
    { text: "At least 8 characters", valid: password.length >= 8 },
    { text: "Contains a number", valid: /\d/.test(password) },
    { text: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
    { text: "Contains special character", valid: /[!@#$%^&*]/.test(password) },
  ];
};
