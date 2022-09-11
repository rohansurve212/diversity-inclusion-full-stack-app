/** @format */
import asyncHandler from 'express-async-handler'

import UserBackground from '../models/userBackground.js'
import UserProfile from '../models/userProfile.js'

// @desc    Get userBackground
// @route   GET /api/userbackground
// @access  Private
export const getUserBackground = asyncHandler(async (req, res) => {
  const userBackground = await UserBackground.findOne({
    user: req.user._id,
  })

  if (!userBackground) {
    res.status(400)
    throw new Error('User Background not found')
  }

  //Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the logged in user matches the userBackground user
  if (userBackground.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  res.status(200).json(userBackground)
})

// @desc    Set userBackground
// @route   POST /api/userbackground
// @access  Private
export const setUserBackground = asyncHandler(async (req, res) => {
  const userBackground = new UserBackground({
    user: req.user._id,
    namePronunciation: req.body.namePronunciation || '',
    pronoun: req.body.pronoun || '',
    favFestival: req.body.favFestival || '',
    favSport: req.body.favSport || '',
    favCuisine: req.body.favCuisine || '',
    favHobby: req.body.favHobby || '',
    biggestInspiration: req.body.biggestInspiration || '',
  })

  const user = await UserProfile.findById(req.user._id)
  console.log(user)

  const createdUserBackground = await userBackground.save()

  if (user) {
    user.userFormCreated = true
    await user.save()
  }

  if (createdUserBackground) {
    res.status(201).json(createdUserBackground)
  } else {
    res.status(400)
    throw new Error('Invalid user background')
  }
})

// @desc    Update userBackground
// @route   PUT /api/userbackground
// @access  Private
export const updateUserBackground = asyncHandler(async (req, res) => {
  const userBackground = await UserBackground.findOne({
    user: req.user._id,
  })

  if (!userBackground) {
    res.status(400)
    throw new Error('User Background not found')
  }

  //Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the logged in user matches the userBackground user
  if (userBackground.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const {
    namePronunciation,
    pronoun,
    favFestival,
    favSport,
    favCuisine,
    favHobby,
    biggestInspiration,
  } = await req.body

  if (userBackground) {
    userBackground.namePronunciation =
      namePronunciation || userBackground.namePronunciation
    userBackground.pronoun = pronoun || userBackground.pronoun
    userBackground.favFestival = favFestival || userBackground.favFestival
    userBackground.favSport = favSport || userBackground.favSport
    userBackground.favCuisine = favCuisine || userBackground.favCuisine
    userBackground.favHobby = favHobby || userBackground.favHobby
    userBackground.biggestInspiration =
      biggestInspiration || userBackground.biggestInspiration

    const updatedUserBackground = await userBackground.save()
    res.status(200).json(updatedUserBackground)
  } else {
    res.status(404)
    throw new Error('UserBackground not found')
  }
})

// @desc    Delete userBackground
// @route   DELETE /api/userbackground/:id
// @access  Private
export const deleteUserBackground = asyncHandler(async (req, res) => {
  const userBackground = await UserBackground.findById(req.params.id)

  if (!userBackground) {
    res.status(400)
    throw new Error('User Background not found')
  }

  //Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the logged in user matches the userBackground user
  if (userBackground.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await userBackground.remove()
  res.status(200).json({ id: req.params.id })
})

// @desc    Get all userBackground
// @route   GET /api/userbackground/all
// @access  Public
export const getAllUserBackgrounds = asyncHandler(async (req, res) => {
  const userBackgrounds = await UserBackground.find({}).populate(
    'user',
    'id name'
  )

  res.status(200).json(userBackgrounds)
})
