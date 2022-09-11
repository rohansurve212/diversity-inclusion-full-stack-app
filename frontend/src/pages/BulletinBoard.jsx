/** @format */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

import { getAllUserBackgrounds } from '../features/userBackground/userBackgroundSlice'

const BulletinBoard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user: loggedInUser } = useSelector((state) => state.auth)

  const { allUserBackgrounds } = useSelector((state) => state.userBackground)

  const [triviaCard, setTriviaCard] = useState(false)

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
    }

    dispatch(getAllUserBackgrounds())
  }, [loggedInUser, navigate, dispatch])

  const createTriviaCard = () => {
    setTriviaCard(true)

    const randomUserBackground =
      allUserBackgrounds[Math.floor(Math.random() * allUserBackgrounds.length)]

    const keys = Object.keys(randomUserBackground)

    const randomUserDetail = keys[Math.floor(Math.random() * keys.length)]

    console.log(randomUserDetail, randomUserBackground[randomUserDetail])
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {loggedInUser && loggedInUser.name}</h1>
        <p>Game Board</p>
        <div className='d-grid gap-2'>
          <Button variant='secondary' onClick={createTriviaCard} size='lg'>
            Do you want to know your teammates better?
          </Button>
        </div>
        <h2> </h2>
        {triviaCard && (
          <Card>
            <p>
              This person loves to eat Mexican food and watch crime drama on TV.
              Who are we talking about?
            </p>
          </Card>
        )}
      </section>
    </>
  )
}

export default BulletinBoard
