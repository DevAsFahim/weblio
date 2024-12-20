import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthController.register,
);

router.post(
  '/login',
  // validateRequest(UserValidation.createUserValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
