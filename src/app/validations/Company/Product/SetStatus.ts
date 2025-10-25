import * as yup from 'yup';

export const setStatusSchema = yup.object({
    status: yup
    .string()
    .oneOf(['activate', 'disable'], 'O parâmetro status precisa conter "activate" ou "disable".')
    .optional()
})

export type setStatus = yup.InferType<typeof setStatusSchema>