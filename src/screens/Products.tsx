import {
  Button,
  Grid,
  GridItem,
  HStack,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Wrap,
  WrapItem,
  useMediaQuery,
  Modal,
  Text
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '../components/Loading';
import { ModalProject } from '../components/ModalProduct';
import { ModalUpdate } from '../components/ModalUpdate';
import { getStorage } from '../services/getStorage';
import { Footer } from './../components/Footer';
import { Header } from './../components/Header';
import { IProduct, Product } from './../components/Product';
import { apiContext } from './../services/apiAuth';
type IHome = IProduct;

export function Products() {
  const token = getStorage('token');
  const navigate = useNavigate();
  const [page, setPage] = useState(true);
  const [products, setProducts] = useState<
    IHome[] | undefined
  >(undefined);
  const [isMobile] = useMediaQuery('(max-width: 700px)');
  const [productModalOpen, setProductModalOpen] =
    useState<IProduct>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onHandleEdit = useCallback(() => {
    setPage(prev => !prev);
  }, []);
  const handleDelete = useCallback(
    async (id: string) => {
      const api = apiContext(token);
      await api.delete(`/products/${id}`);
      const newProducts = products?.filter(
        product => product.id !== id
      );
      setProducts(newProducts);
      onClose();
    },
    [products]
  );
  const onHandleClick = useCallback(
    (props: IProduct) => {
      setProductModalOpen(props);
      onOpen();
    },
    [onOpen]
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const api = apiContext(token);
        const response = await api.get<IProduct[]>(
          '/products'
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
        navigate('/offline');
      }
    }
    fetchProducts();
  }, [token]);
  if (!products) return <Loading />;

  return (
    <>
      <Grid
        templateAreas={`"header" "main" "footer"`}
        gridTemplateRows={'auto minmax(100vh, auto) auto'}
        gridTemplateColumns="100%"
        minH="100vh"
        maxW="100vw"
      >
        <GridItem area="header">
          <Header menu />
        </GridItem>
        <Wrap
          maxW="100vw"
          gridArea={'main'}
          flex={1}
          bg="gray.700"
          px={6}
          py={7}
          alignItems="center"
          justify={isMobile ? 'center' : 'space-between'}
          minH="100vh"
        >
          {products.length > 0 ? (
            products.map(product => (
              <WrapItem key={product.id}>
                <Product
                  {...product}
                  onHandleClick={onHandleClick}
                />
              </WrapItem>
            ))
          ) : (
            <WrapItem>
              <Text>Nenhum produto encontrado</Text>
            </WrapItem>
          )}
        </Wrap>
        <GridItem bg="gray.800" area="footer">
          <Footer />
        </GridItem>
      </Grid>
      <Modal isCentered onClose={onClose} isOpen={isOpen}>
        <ModalOverlay bg="gray.900" />
        <ModalContent>
          {page ? (
            <ModalProject {...productModalOpen} />
          ) : (
            <ModalUpdate {...productModalOpen} />
          )}
          <ModalFooter>
            <HStack gap={4}>
              <Button onClick={() => onHandleEdit()}>
                {page
                  ? 'Atualizar Dispositivo'
                  : 'Visualizar Dispositivo'}
              </Button>
              <Button
                onClick={() =>
                  handleDelete(productModalOpen?.id ?? '')
                }
              >
                Deletar Dispositivo
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
