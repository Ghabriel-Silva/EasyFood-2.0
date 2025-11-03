import * as yup from 'yup';


const configConpanyPatch = yup.object({
     name: yup
     .string().notRequired(),
     defaultFreight: yup 
     .number()
     .typeError('O Valor do frete deve ser um numero')
     .positive('O valor do frete deve ser positivo')
     .notRequired()
     
})

export type ConfigConpanyPatch = yup.InferType<typeof configConpanyPatch>
