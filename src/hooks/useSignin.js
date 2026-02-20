import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '@/context/AuthContext';

export const useSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error: signInError } = await signInUser(email, password);

    if (signInError) {
      setError('Incorrect email or password. Please try again.');
    } else if (data) {
      navigate('/dashboard');
    }
  };

  return {
    email,
    password,
    error,
    loading,
    showPassword,
    setShowPassword,
    handleEmailChange,
    handlePasswordChange,
    handleSignIn
  };
};
