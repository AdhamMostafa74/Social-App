import * as zod from "zod"

export const schema = zod.object({

    password: zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
         'Minimum eight characters, at least one letter, one number and one special character:'),
         
    newPassword: zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
         'Minimum eight characters, at least one letter, one number and one special character:'),

}).refine((data) => data.newPassword !== data.password, { message: "New password must be different from old password", path: ['newPassword'] })
