import * as yup from 'yup';


export const configConpanySchema = yup.object({
     name: yup
          .string()
          .min(3, "O campo nome deve ter pelo menos 3 caracteres")
          .max(100, "O campo nome não pode ter mais de 100 caracteres")
          .optional(),
     defaultFreight: yup
          .number()
          .typeError('O Valor do frete deve ser um numero')
          .positive('O valor do frete deve ser positivo')
          .required('Defina um valor ao enviar')

})

export type ConfigConpanySchema = yup.InferType<typeof configConpanySchema>
