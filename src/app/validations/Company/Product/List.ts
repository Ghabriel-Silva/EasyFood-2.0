import * as yup from 'yup';

export const listSchemaProducts = yup.object({
    status: yup
    .string()
    .oneOf(["active", "desactivated"], "Status deve ser um dos seguintes valores: active, desactivated")
    .optional()
})

export type listSchema = yup.InferType<typeof listSchemaProducts>