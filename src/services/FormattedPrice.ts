export const FormattedPrice = (price: number) => {
  const priceWithPunctuation = price / 100;
  const priceFormated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(priceWithPunctuation);
  return priceFormated;
};
