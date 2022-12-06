import { Heading, HStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Logo from './../logo.svg';
interface IHeaderProps {
  menu?: boolean;
}
export const Header = ({ menu }: IHeaderProps) => {
  return (
    <HStack
      justifyContent="space-between"
      bg="blackAlpha.800"
      w="full"
      height="16"
      px={4}
    >
      <HStack gap={3}>
        <Image src={Logo} alt="logo" />
        <Heading
          color="white"
          size="lg"
          fontFamily="Montserrat"
          fontWeight={900}
        >
          <Link to={menu ? '/products' : '/'}>
            MacMagazine
          </Link>
        </Heading>
      </HStack>
      <HStack
        display={menu ? 'flex' : 'none'}
        color="whiteAlpha.800"
        fontFamily="Montserrat"
        gap={5}
      >
        <Link to="/products">Produtos</Link>
        <Link to="/create-products">Criar produto</Link>
        <Link to="/map">Mapa</Link>
      </HStack>
    </HStack>
  );
};
