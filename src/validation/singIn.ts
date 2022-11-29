import * as yup from 'yup';

export const schema = yup.object({
  identifier: yup
    .string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(255, 'A senha deve ter no máximo 255 caracteres')
    .required('A senha é obrigatória')
});
