/** @format */

import mongoose from 'mongoose'

const userProfileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email address'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    userFormCreated: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('UserProfile', userProfileSchema)
