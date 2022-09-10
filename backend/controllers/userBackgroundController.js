/** @format */
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

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

  const createdUserBackground = await userBackground.save()
  if (createdUserBackground) {
    res.status(201).json(createdUserBackground)
  } else {
    res.status(400)
    throw new Error('Invalid user background')
  }
})

// @desc    Update userBackground
// @route   PUT /api/userbackground/:id
// @access  Private
export const updateUserBackground = asyncHandler(async (req, res) => {
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
  if (userBackground.user.toString() !== req.user.id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedUserBackground = await UserBackground.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )
  res.status(200).json(updatedUserBackground)
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
