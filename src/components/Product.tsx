import {
  Heading,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';

import { FormattedPrice } from '../services/FormattedPrice';
export interface IProduct {
  title: string;
  priceForCents: number;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
type IProductProps = IProduct & {
  onHandleClick: (props: IProductProps) => void;
};
export const Product = (props: IProductProps) => {
  const { title, priceForCents, image, onHandleClick } =
    props;
  return (
    <VStack
      width="72"
      height="96"
      boxShadow="lg"
      bg="gray.500"
      px={4}
      py={6}
      borderRadius="md"
      justifyContent="space-between"
      _hover={{
        transform: 'scale(1.07)',
        transition: 'all 0.5s ease-in-out',
        cursor: 'pointer'
      }}
      onClick={() => onHandleClick(props)}
    >
      <Image
        src={image}
        borderRadius="md"
        height={40}
        maxW="100vh"
      />
      <Heading>{title}</Heading>
      <Text
        alignSelf="start"
        fontSize="2xl"
        fontWeight={700}
      >
        {FormattedPrice(priceForCents)}
      </Text>
      <Text alignSelf="start" fontSize="xs">
        ou 12x de {FormattedPrice(priceForCents / 12)}
      </Text>
    </VStack>
  );
};
