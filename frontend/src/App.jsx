import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepages from './Pages/Homepages'
import Loginpages from './Pages/Loginpages'
import Singuppages from './Pages/Singuppages'

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepages />} />
          <Route path='/login' element={<Loginpages />} />
          <Route path='/singup' element={<Singuppages />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
