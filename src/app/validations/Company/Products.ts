import * as yup from 'yup';

const productSchema = yup.object({
  name: yup.string().required('O nome do produto é obrigatório'),
  price: yup
    .number()
    .typeError('O preço deve ser um número')
    .positive('O preço deve ser positivo')
    .required('O preço é obrigatório'),
  quantity: yup
    .number()
    .integer('A quantidade deve ser um número inteiro')
    .min(0, 'A quantidade não pode ser negativa')
    .notRequired(),
  expirationDate: yup.date().typeError('Data inválida').notRequired(),
  description: yup.string().notRequired(),
  categoryId: yup.string().notRequired(),
});
