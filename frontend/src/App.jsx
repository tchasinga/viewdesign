import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import SignUpPage from './Pages/SignUpPage'
import Navbar from './Components/Navbars'
import LoginPage from './Pages/LoginPage'

import { useEffect } from 'react';
import { useUserStore } from './stores/useUserStore.js';
import LoadingSpinner from './Components/LoadingSpinner.jsx';
import HomePage from './Pages/HomePage.jsx';
import AdminPage from './Pages/AdminPage.jsx';


function App() {

  const { user, checkAuth, checkingAuth } = useUserStore();

	// const { getCartItems } = useCartStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		// getCartItems();
	}, [user]);

	if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
    {/* Background gradient */}
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
      </div>
    </div>
    {/* Background gradient is added here for making thn background image  */}
     <div className="relative z-50 pt-20">
      <BrowserRouter>
        <Navbar /> 
        <Toaster />
        <Routes>
        <Route path='/' element={<HomePage />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />

          <Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
          <Route path='*' element={<h1 className='text-center text-3xl'>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  )
}

export default App
