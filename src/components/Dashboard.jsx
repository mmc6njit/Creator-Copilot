import React from 'react'
import { useNavigate } from 'react-router-dom'
import  { UserAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { session, signOutUser } = UserAuth();
  const navigate = useNavigate();
  const full_name = session?.user?.user_metadata?.full_name || session?.user?.email;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {full_name} to your dashboard! Here you can manage your projects, view analytics, and access all your tools in one place.</p>
      <p>Use the navigation menu to explore different sections of your dashboard and stay on top of your creative work.</p> 
    </div>
  )
}

export default Dashboard