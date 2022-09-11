/** @format */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  createUserBackground,
  updateUserBackground,
  getUserBackground,
} from '../features/userBackground/userBackgroundSlice'

const UserBackgroundForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user: loggedInUser } = useSelector((state) => state.auth)

  const {
    userBackground,
    createUserBackgroundIsLoading,
    createUserBackgroundIsError,
    createUserBackgroundMessage,
    getUserBackgroundIsLoading,
    getUserBackgroundIsError,
    getUserBackgroundMessage,
  } = useSelector((state) => state.userBackground)

  console.log(userBackground)

  const FORM_DATA_INITIAL_STATE = {
    namePronunciation: '',
    pronoun: '',
    favFestival: '',
    favSport: '',
    favCuisine: '',
    favHobby: '',
    biggestInspiration: '',
  }
  const [formData, setFormData] = useState(FORM_DATA_INITIAL_STATE)

  const {
    namePronunciation,
    pronoun,
    favFestival,
    favSport,
    favCuisine,
    favHobby,
    biggestInspiration,
  } = formData

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
    } else {
      if (loggedInUser.userFormCreated) {
        dispatch(getUserBackground())
      } else {
        if (userBackground.user === loggedInUser._id) {
          dispatch(getUserBackground())
        } else {
          navigate('/')
        }
      }
    }

    setFormData({
      namePronunciation: userBackground.namePronunciation || '',
      pronoun: userBackground.pronoun || '',
      favFestival: userBackground.favFestival || '',
      favSport: userBackground.favSport || '',
      favCuisine: userBackground.favCuisine || '',
      favHobby: userBackground.favHobby || '',
      biggestInspiration: userBackground.biggestInspiration || '',
    })
  }, [
    dispatch,
    navigate,
    loggedInUser,
    userBackground.namePronunciation,
    userBackground.pronoun,
    userBackground.favFestival,
    userBackground.favSport,
    userBackground.favCuisine,
    userBackground.favHobby,
    userBackground.biggestInspiration,
    userBackground.user,
  ])

  const formDataChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createUserBackground(formData))
  }

  const updateButtonHandler = () => {
    dispatch(updateUserBackground(formData))
  }

  if (createUserBackgroundIsLoading || getUserBackgroundIsLoading) {
    return <Loader />
  }

  return (
    <>
      <h1>Welcome {loggedInUser && loggedInUser.name}</h1>
      <p>Help Us Know You Better</p>
      {createUserBackgroundIsError && (
        <Message variant='danger'>{createUserBackgroundMessage}</Message>
      )}
      <FormContainer>
        {getUserBackgroundIsError ? (
          <Message variant='danger'>{getUserBackgroundMessage}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='namePronunciation'>
              <Form.Label>How to pronounce your name?</Form.Label>
              <Form.Control
                type='text'
                name='namePronunciation'
                value={namePronunciation}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='pronoun'>
              <Form.Label>What's your preferred pronoun?</Form.Label>
              <Form.Control
                type='text'
                name='pronoun'
                value={pronoun}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='favFestival'>
              <Form.Label>Your favorite festival is ...</Form.Label>
              <Form.Control
                type='text'
                name='favFestival'
                value={favFestival}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='favSport'>
              <Form.Label>Your favorite sport is ...</Form.Label>
              <Form.Control
                type='text'
                name='favSport'
                value={favSport}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='favCuisine'>
              <Form.Label>Your favorite cuisine is ...</Form.Label>
              <Form.Control
                type='text'
                name='favCuisine'
                value={favCuisine}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='favHobby'>
              <Form.Label>Your favorite hobby is ...</Form.Label>
              <Form.Control
                type='text'
                name='favHobby'
                value={favHobby}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Form.Group controlId='biggestInspiration'>
              <Form.Label>
                Who/ What has been a constant inspiration in your life?
              </Form.Label>
              <Form.Control
                type='text'
                name='biggestInspiration'
                value={biggestInspiration}
                onChange={formDataChangeHandler}
              ></Form.Control>
            </Form.Group>
            <h2> </h2>
            <Button type='submit' variant='primary'>
              Confirm
            </Button>{' '}
            <Button
              variant='primary'
              className='btn btn-light my-3'
              onClick={updateButtonHandler}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserBackgroundForm
