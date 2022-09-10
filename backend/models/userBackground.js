/** @format */

import mongoose from 'mongoose'

const userBackgroundSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserProfile',
    },
    namePronunciation: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    pronoun: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    favFestival: {
      type: String,
    },
    favSport: {
      type: String,
    },
    favCuisine: {
      type: String,
    },
    favHobby: {
      type: String,
    },
    biggestInspiration: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('UserBackground', userBackgroundSchema)
