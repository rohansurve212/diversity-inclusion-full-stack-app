/** @format */

import express from 'express'
import {
  deleteUserBackground,
  getUserBackground,
  setUserBackground,
  updateUserBackground,
  getAllUserBackgrounds,
} from '../controllers/userBackgroundController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(protect, getUserBackground)
  .post(protect, setUserBackground)
  .put(protect, updateUserBackground)
router.route('/:id').delete(protect, deleteUserBackground)
router.route('/all').get(getAllUserBackgrounds)

export default router
