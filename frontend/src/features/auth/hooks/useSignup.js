import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '@/features/auth/context/AuthContext';
import { validateName, validateEmail, validatePassword, validateOccupation, getPasswordValidations } from '@/utils/validations';

export const useSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [occupationError, setOccupationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const passwordValidations = getPasswordValidations(password);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const validation = validateName(value);
    if (validation.valid) {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const validation = validateEmail(value);
    if (validation.valid) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const validation = validatePassword(value);
    if (validation.valid) {
      setPasswordError('');
    }
  };

  const handleOccupationChange = (value) => {
    setOccupation(value);
    const validation = validateOccupation(value);
    if (validation.valid) {
      setOccupationError('');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setOccupationError('');

    let hasError = false;

    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      setNameError(nameValidation.message);
      hasError = true;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setEmailError(emailValidation.message);
      hasError = true;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.message);
      hasError = true;
    }

    const occupationValidation = validateOccupation(occupation);
    if (!occupationValidation.valid) {
      setOccupationError(occupationValidation.message);
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const result = await signUpNewUser(name, email, password, occupation);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error.message);
      }
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    password,
    occupation,
    error,
    loading,
    nameError,
    emailError,
    passwordError,
    occupationError,
    showPassword,
    setShowPassword,
    passwordValidations,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleOccupationChange,
    handleSignUp
  };
};
