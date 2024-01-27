import { z } from 'zod';

export const registerFormSchema = z.object({
  fullname: z.string({
    required_error: "Fullname is required.",
    invalid_type_error: "Fullname must be a string."
  }).min(2, { message: "Fullname must be at least 2 or more characters long. "}).max(30, { message: "Fullname must be 30 or fewer characters long." }),
  email: z.string().email({ message: "Email is required and must be in a correct format." }),
  password: z.string({
    required_error: "Password is required"
  }).min(6, { message: "Password at least 6 or more characters long." }).max(20, { message: "Password at least 20 or fewer characters long." }),
  confirmPassword: z.string().min(6, {message: "Confirm password at least 6 or more characters long."}).max(20, {message: "Confirm password at least 20 or fewer characters long."}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password do not match",
  path: ["confirmPassword"]
});

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Email is required and must be in a correct format." }),
  password: z.string({
    required_error: "Password is required"
  }).min(6, { message: "Password at least 6 or more characters long." }).max(20, { message: "Password at least 20 or fewer characters long." }),
});

export const createPostFormSchema = z.object({
  textContent: z.string().min(1, { message: "Text content must be at least 1 or more characters long. "}).max(1000, { message: "Text content must be 1000 or fewer characters long." }),
});

export const createReplyFormSchema = z.object({
  textContent: z.string().min(1, { message: "Text content must be at least 1 or more characters long. "}).max(1000, { message: "Text content must be 1000 or fewer characters long." }),
});

export const editProfileFormSchema = z.object({
  username: z.string({
    required_error: "Username required",
  }).min(6, { message: "Username at least 6 or more characters long." }).max(30, { message: "Username at least 30 or fewer characters long." }),
  fullname: z.string({
    required_error: "Fullname is required.",
    invalid_type_error: "Fullname must be a string."
  }).min(2, { message: "Fullname must be at least 2 or more characters long. "}).max(30, { message: "Fullname must be 30 or fewer characters long." }),
  bio: z.string(),
  location: z.string()
});