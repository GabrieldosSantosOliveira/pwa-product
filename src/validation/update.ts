import * as yup from 'yup';

export const schema = yup.object({
  title: yup
    .string()
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(255, 'O título deve ter no máximo 255 caracteres')
    .optional(),
  priceForCents: yup.number().optional(),
  image: yup
    .string()
    .url('Insira uma url válida')
    .max(255, 'A imagem deve ter no máximo 255 caracteres')
    .min(3, 'A imagem deve ter no mínimo 3 caracteres')
    .optional(),
  desccription: yup
    .string()
    .max(
      255,
      'A descrição deve ter no máximo 255 caracteres'
    )
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
    .optional()
});
