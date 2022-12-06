import {
  ModalBody,
  ModalHeader,
  Button,
  ModalCloseButton,
  Heading,
  FormControl,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  useToast
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Money, Image as ImageIcon } from 'phosphor-react';
import { useForm } from 'react-hook-form';

import { apiContext } from '../services/apiAuth';
import { getStorage } from '../services/getStorage';
import { schema } from '../validation/update';
import { IProduct } from './Product';
type IModalProduct = Partial<IProduct>;
type IForm = Omit<
  IProduct,
  'id' | 'createdAt' | 'updatedAt'
>;
export const ModalUpdate = ({
  description,
  image,
  title,
  priceForCents,
  id
}: IModalProduct) => {
  const toast = useToast();
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<IForm>({
    resolver: yupResolver(schema)
  });
  const handleUpdateProduct = async (data: IForm) => {
    try {
      const api = apiContext(getStorage('token'));
      await api.put(`/products/${id}`, data);
      toast({
        title: 'Atualização realizada com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Falha a atualização!',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };
  return (
    <>
      <ModalHeader fontFamily="Roboto" fontWeight={700}>
        <Heading>{title}</Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <FormControl
            isInvalid={!!errors?.description}
            my={6}
          >
            <Input
              type="text"
              placeholder="Imagem"
              id="description"
              defaultValue={description}
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
                defaultValue={image}
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
                defaultValue={priceForCents}
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
              defaultValue={title}
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
      </ModalBody>
    </>
  );
};
