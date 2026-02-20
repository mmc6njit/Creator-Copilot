import React from 'react'
import { useNavigate } from 'react-router-dom'
import  { UserAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  const { session, signOutUser } = UserAuth();
  const navigate = useNavigate();
  const full_name = session?.user?.user_metadata?.full_name || session?.user?.email;

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOutUser();
      navigate("/")
    } catch (err) {
      setError("An error occurred while signing out. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {full_name} to your dashboard! Here you can manage your projects, view analytics, and access all your tools in one place.</p>
      <p>Use the navigation menu to explore different sections of your dashboard and stay on top of your creative work.</p>
      <Button className="mt-4" onClick={handleSignOut}>Sign Out</Button>
    </div>
  )
}

export default Dashboard;