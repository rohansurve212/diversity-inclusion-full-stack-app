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
  const [checkAnswer, setCheckAnswer] = useState(false)
  const [displayQuestion, setDisplayQuestion] = useState(false)

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
    }

    dispatch(getAllUserBackgrounds())
  }, [loggedInUser, navigate, dispatch])

  let questionBank = []
  let question = ''
  let answer = ''

  if (triviaCard) {
    const randomUserBackground =
      allUserBackgrounds[Math.floor(Math.random() * allUserBackgrounds.length)]

    questionBank = [
      `This person loves ${randomUserBackground.favCuisine} cuisine and enjoys the sport of ${randomUserBackground.favSport}. Who are we talking about?`,
      `This person celebrates the festival of ${randomUserBackground.favFestival} and loves ${randomUserBackground.favHobby} as a favorite hobby. Who are we talking about?`,
      `This person loves ${randomUserBackground.favCuisine} cuisine and celebrates the festival of ${randomUserBackground.favFestival}. Who are we talking about?`,
      `This person enjoys the sport of ${randomUserBackground.favSport} and loves ${randomUserBackground.favHobby} as a favorite hobby. Who are we talking about?`,
    ]

    question = questionBank[Math.floor(Math.random() * questionBank.length)]
    answer = randomUserBackground.user.name
  }

  const createTriviaCard = () => {
    setDisplayQuestion(true)
    setTriviaCard(true)
  }

  const checkAnswerHandler = () => {
    setDisplayQuestion(false)
    setCheckAnswer(true)
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
        {triviaCard && displayQuestion && (
          <>
            <Card>
              <p>{question}</p>
            </Card>
            <h2> </h2>
            <Button variant='secondary' onClick={checkAnswerHandler} size='lg'>
              Check Answer
            </Button>
            <h2> </h2>
          </>
        )}
        {triviaCard && checkAnswer && !displayQuestion && <Card>{answer}</Card>}
      </section>
    </>
  )
}

export default BulletinBoard
