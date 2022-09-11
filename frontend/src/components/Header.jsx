/** @format */
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaGamepad } from 'react-icons/fa'

import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user: loggedInUser } = useSelector((state) => state.auth)

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <h1>Bond Better</h1>
        </Link>
      </div>
      <ul>
        {loggedInUser ? (
          <>
            <li>
              <button className='btn' onClick={logoutHandler}>
                <FaGamepad />
                Game Board
              </button>
            </li>
            <li>
              <button className='btn' onClick={logoutHandler}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
