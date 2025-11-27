import * as zod from "zod"



export const schema = zod.object({
  name: zod.string().min(2, "Name must have at least 2 character").max(16, "Name can't exceed 16 character"),
  email: zod.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"),
  password: zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character:'),
  rePassword: zod.string(),
  dateOfBirth: zod.coerce.date().refine((date) => {
    const birthDate = date.getFullYear();
    const now = new Date().getFullYear();
    const age = now - birthDate;
    return age >= 18;

  }, { message: 'You must be at least 18 or older to access.' }),
  gender: zod.string()
  .nonempty('Gender is required')
  .regex(/^(male|female)$/, 'Enter a valid gender')
}).refine((data) => data.rePassword === data.password, { message: "Password doesn't match", path: ['rePassword'] })
