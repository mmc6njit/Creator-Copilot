import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <AuthContextProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </AuthContextProvider>
    </>
  </StrictMode>,
)
