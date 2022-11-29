import {
  ModalBody,
  ModalHeader,
  VStack,
  Text,
  ModalCloseButton,
  Image,
  Heading
} from '@chakra-ui/react';

import { FormattedPrice } from '../services/FormattedPrice';
import { IProduct } from './Product';
type IModalProduct = Partial<IProduct>;
export const ModalProject = ({
  description,
  image,
  title,
  priceForCents
}: IModalProduct) => {
  return (
    <>
      <ModalHeader fontFamily="Roboto" fontWeight={700}>
        <Heading>{title}</Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack gap={5}>
          <Image src={image} borderRadius="md" />
          <Text alignSelf="start" as="p" fontWeight={500}>
            {description}
          </Text>
          <Text alignSelf="start" fontWeight={700}>
            Total de {FormattedPrice(priceForCents ?? 100)}{' '}
            á vista
          </Text>
          <Text
            alignSelf="start"
            fontWeight={700}
            fontSize=""
          >
            ou 12X de{' '}
            {FormattedPrice((priceForCents ?? 100) / 12)} no
            cartão de crédito
          </Text>
        </VStack>
      </ModalBody>
    </>
  );
};
