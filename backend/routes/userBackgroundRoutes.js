/** @format */

import express from 'express'
import {
  deleteUserBackground,
  getUserBackground,
  setUserBackground,
  updateUserBackground,
} from '../controllers/userBackgroundController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(protect, getUserBackground)
  .post(protect, setUserBackground)
router
  .route('/:id')
  .put(protect, updateUserBackground)
  .delete(protect, deleteUserBackground)

export default router
