import * as yup from 'yup';

export const listSchemaProducts = yup.object({
    status: yup
    .string()
    .oneOf(["active", "desactivated"], "Status deve ser um dos seguintes valores: active, desactivated")
    .optional(),

    preco: yup 
    .string()
    .oneOf(["menor", "maior"], "Preço deve ser um dos seguintes valores: maior, manor")
    .optional()
})

export type listSchema = yup.InferType<typeof listSchemaProducts>