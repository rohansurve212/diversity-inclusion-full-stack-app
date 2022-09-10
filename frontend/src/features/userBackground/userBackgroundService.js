/** @format */

import axios from 'axios'

const API_URL = '/api/userbackground'

//Create new userBackground
const createUserBackground = async (newUserBackgroundData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, newUserBackgroundData, config)

  return response.data
}

//Get userBackground
const getUserBackground = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  console.log(response.data)
  return response.data
}

//Update userBackground
const updateUserBackground = async (updatedUserBackgroundData, token) => {
  const reqBody = updatedUserBackgroundData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(`${API_URL}/${reqBody._id}`, reqBody, config)

  return response.data
}

//Delete userBackground
const deleteUserBackground = async (userBackgroundId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`${API_URL}/${userBackgroundId}`, config)

  return response.data
}

const userBackgroundService = {
  createUserBackground,
  getUserBackground,
  updateUserBackground,
  deleteUserBackground,
}

export default userBackgroundService
