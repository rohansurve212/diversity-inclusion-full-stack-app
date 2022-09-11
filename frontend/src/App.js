/** @format */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import Footer from './components/Footer'
import UserBackgroundForm from './pages/UserBackgroundForm'
import Login from './pages/Login'
import Register from './pages/Register'
import BulletinBoard from './pages/BulletinBoard'

const App = () => {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<UserBackgroundForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/gameboard' element={<BulletinBoard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
