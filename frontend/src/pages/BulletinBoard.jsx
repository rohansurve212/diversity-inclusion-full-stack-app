/** @format */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user: loggedInUser } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
    }
  }, [loggedInUser, navigate, dispatch])

  return (
    <>
      <section className='heading'>
        <h1>Hi {loggedInUser && loggedInUser.name}</h1>
        <p>Bulletin Board</p>
      </section>
    </>
  )
}

export default Dashboard
