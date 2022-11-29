import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .max(255, 'A senha deve ter no máximo 255 caracteres')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  firstName: yup
    .string()
    .required('O nome é obrigatório')
    .max(255, 'O nome deve ter no máximo 255 caracteres')
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  lastName: yup
    .string()
    .required('O sobrenome é obrigatório')
    .max(
      255,
      'O sobrenome deve ter no máximo 255 caracteres'
    )
    .min(3, 'O sobrenome deve ter no mínimo 3 caracteres')
});
