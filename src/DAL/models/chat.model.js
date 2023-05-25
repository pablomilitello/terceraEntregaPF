import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  chat: [
    {
      user: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
});

export const chatModel = mongoose.model('Chat', chatSchema);
