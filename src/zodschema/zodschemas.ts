import * as z from "zod";

// responseSchema api
export const responseSchema1 = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  phone: z.string().length(11, "invalid number"),
  id: z.string(),
});
export type responseType = z.infer<typeof responseSchema>;

// form schema

export const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters long" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Name should only contain letters" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Invalid email format",
      }),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" }),
    confirmPassword: z.string(),
    age: z.coerce
      .number()
      .int()
      .min(18, { message: "Age should be at least 18" })
      .max(60, { message: "Age should be at most 60" }),
    phone: z
      .string()
      .refine((value) => /^(011|012|010|015)\d{8}$/.test(value), {
        message: "Invalid phone number",
      }),
  })
  .refine(
    (data) => {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return passwordRegex.test(data.password);
    },
    {
      message: "at least one letter,and one special character",
      path: ["password"],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type formDataType = z.infer<typeof formSchema>;

export const responseSchema = z.object({
  success: z.boolean(),
  data: z.optional(formSchema),
  errors: z.optional(z.record(z.string())),
});
export type responseDataType = {
  success: boolean;
  data?: formDataType;
  errors?: Record<string, string>;
};
