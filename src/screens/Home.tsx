import {
  Button,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

import { Loading } from '../components/Loading';
import { Footer } from './../components/Footer';
import { Header } from './../components/Header';
import { IProduct, Product } from './../components/Product';
import { api } from './../services/api';
import { Register } from './Register';
import { SingIn } from './SingIn';
type IHome = IProduct;

export function Home() {
  const [products, setProducts] = useState<IHome[] | null>(
    null
  );
  const [isMobile] = useMediaQuery('(max-width: 700px)');

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isRegister, setIsRegister] =
    useState<boolean>(false);
  const onHandleClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get<IProduct[]>(
        '/products'
      );
      setProducts(response.data);
    }
    fetchProducts();
  }, []);
  if (!products) return <Loading />;
  if (products.length === 0)
    return <div>Nenhum produto encontrado</div>;
  return (
    <>
      <Grid
        templateAreas={`"header" "main" "footer"`}
        gridTemplateRows={'auto minmax(100vh, auto) auto'}
        gridTemplateColumns={'1fr'}
        minH="100vh"
      >
        <GridItem area="header">
          <Header />
        </GridItem>
        <GridItem bg="gray.700" px={6} py={7} area="main">
          <Wrap
            maxW="100vw"
            flex={1}
            bg="gray.700"
            px={6}
            py={7}
            alignItems="center"
            justify={isMobile ? 'center' : 'space-between'}
            minH="100vh"
          >
            {products.map(product => (
              <WrapItem key={product.id}>
                <Product
                  {...product}
                  onHandleClick={onHandleClick}
                />
              </WrapItem>
            ))}
          </Wrap>
        </GridItem>
        <GridItem bg="gray.800" area="footer">
          <Footer />
        </GridItem>
      </Grid>
      <Modal isCentered onClose={onClose} isOpen={isOpen}>
        <ModalOverlay bg="gray.900" />
        <ModalContent>
          {isRegister ? <Register /> : <SingIn />}
          <ModalFooter>
            {isRegister ? (
              <HStack>
                <Text>Já tem uma conta?</Text>
                <Button
                  onClick={() => setIsRegister(!isRegister)}
                >
                  Login
                </Button>
              </HStack>
            ) : (
              <HStack>
                <Text>Ainda não possui cadastro?</Text>
                <Button
                  onClick={() => setIsRegister(!isRegister)}
                >
                  Cadastre-se
                </Button>
              </HStack>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
