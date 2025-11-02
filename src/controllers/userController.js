import createHttpError from 'http-errors';
import {
  saveFileToCloudinary,
  deleteFileFromCloudinary,
} from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    next(createHttpError(400, 'No file'));
    return;
  }

  const result = await saveFileToCloudinary(req.file.buffer);

  if (req.user.avatar_id !== '') {
    await deleteFileFromCloudinary(req.user.avatar_id);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url, avatar_id: result.public_id },
    { new: true },
  );

  res.status(200).json({ url: user.avatar });
};

export const updateUser = async (req, res, next) => {
  const { body } = req;

  const user = await User.findByIdAndUpdate(req.user._id, body, { new: true });

  res.status(200).json(user);
};
