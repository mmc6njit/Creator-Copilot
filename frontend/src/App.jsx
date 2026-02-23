import { useState } from 'react'
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
    <div className="flex flex-col">
      <Link to="/signin">Sign in here</Link>
      <Link to="/signup">Sign up here</Link>
      <Link to="/dashboard">Dashboard here</Link>
    </div>
    </>
  )
}

export default App;
