import { z } from 'zod';

const registerValidationSchema = z.object({
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

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});


export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema
};