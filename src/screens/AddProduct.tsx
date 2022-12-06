import {
  Grid,
  GridItem,
  useDisclosure,
  useMediaQuery,
  Modal,
  Text,
  InputGroup,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  InputLeftElement,
  useToast
} from '@chakra-ui/react';
import { Money, Image as ImageIcon } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Loading } from '../components/Loading';
import { ModalProject } from '../components/ModalProduct';
import { getStorage } from '../services/getStorage';
import { Footer } from './../components/Footer';
import { Header } from './../components/Header';
import { IProduct, Product } from './../components/Product';
import { apiContext } from './../services/apiAuth';
type IHome = Omit<
  IProduct,
  'id' | 'createdAt' | 'updatedAt'
>;

export function AddProducts() {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IHome>();
  const handleCreateProduct = async ({
    priceForCents,
    ...rest
  }: IHome) => {
    try {
      const api = apiContext(getStorage('token'));
      console.log({
        priceForCents: Number(priceForCents),
        ...rest
      });
      await api.post(`/products`, {
        priceForCents: Number(priceForCents),
        ...rest
      });
      toast({
        title: 'Cadastro realizada com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Falha ao cadastrar!',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };
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
        <GridItem area="main" bg="gray.800" color="white">
          <form
            onSubmit={handleSubmit(handleCreateProduct)}
          >
            <FormControl
              isInvalid={!!errors?.description}
              my={6}
            >
              <Input
                type="text"
                placeholder="Imagem"
                id="description"
                errorBorderColor="red.500"
                {...register('description')}
              />
              <FormErrorMessage>
                {errors?.description &&
                  errors?.description?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.image} my={6}>
              <InputGroup>
                <InputLeftElement>
                  <ImageIcon />
                </InputLeftElement>
                <Input
                  type="url"
                  placeholder="Imagem"
                  id="image"
                  errorBorderColor="red.500"
                  {...register('image')}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.image && errors.image.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.priceForCents}
              my={6}
            >
              <InputGroup>
                <InputLeftElement>
                  <Money />
                </InputLeftElement>
                <Input
                  type="number"
                  placeholder="Preço"
                  autoComplete="off"
                  id="email"
                  {...register('priceForCents')}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.priceForCents &&
                  errors.priceForCents.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.title} my={6}>
              <Input
                type="text"
                placeholder="Título"
                id="title"
                errorBorderColor="red.500"
                {...register('title')}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <Button w="full" type="submit">
              Atualizar
            </Button>
          </form>
        </GridItem>
        <GridItem bg="gray.800" area="footer">
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
}
