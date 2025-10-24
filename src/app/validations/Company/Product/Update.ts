import * as yup from 'yup';

export const productUpdateSchema = yup.object({
  name: yup.string().notRequired(),
  price: yup
    .number()
    .typeError('O preço deve ser um número')
    .positive('O preço deve ser positivo')
    .notRequired(),
  quantity: yup
    .number()
    .typeError('A quantidade deve ser um número') 
    .integer('A quantidade deve ser um número inteiro')
    .min(0, 'A quantidade não pode ser negativa')
    .notRequired(),
  expirationDate: yup.date().typeError('Data inválida').notRequired(),
  description: yup.string().notRequired(),
  category_id: yup.string().notRequired(),
});

export type ProductUpdateSchema = yup.InferType<typeof productUpdateSchema>