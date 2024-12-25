import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepages from './Pages/Homepages'
import { Toaster } from 'react-hot-toast';

import SignUpPage from './Pages/SignUpPage'
// import Navbar from './Components/Navbars'
import LoginPage from './Pages/LoginPage'

function App() {
  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
    {/* Background gradient */}
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
      </div>
    </div>
    {/* Background gradient */}
     <div className="relative z-50 pt-20">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Toaster />
        <Routes>
          <Route path='/' element={<Homepages />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='*' element={<h1 className='text-center text-3xl'>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  )
}

export default App
