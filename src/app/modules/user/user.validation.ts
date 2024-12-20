import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .max(20),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};