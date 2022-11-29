import { HStack, Text, useTheme } from '@chakra-ui/react';
import {
  TwitterLogo,
  FacebookLogo,
  InstagramLogo
} from 'phosphor-react';

export const Footer = () => {
  const value = useTheme();
  return (
    <HStack h="20" justifyContent="space-between" px="4">
      <Text as="p">Todos os direitos reservados</Text>
      <HStack gap={5}>
        <a
          href="https://twitter.com/apple"
          target="_blank"
          rel="noreferrer"
        >
          <TwitterLogo
            size={30}
            color={value?.colors?.twitter?.[400]}
          />
        </a>
        <a
          href="https://www.facebook.com/apple/"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookLogo
            size={30}
            color={value?.colors?.facebook?.[400]}
          />
        </a>
        <a
          href="https://www.instagram.com/apple/"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramLogo size={30} color="#ff7f09" />
        </a>
      </HStack>
    </HStack>
  );
};
