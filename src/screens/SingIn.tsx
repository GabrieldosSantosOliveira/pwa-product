import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  useToast
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Lock, Envelope } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createStorage } from '../services/createStorage';
import { api } from './../services/api';
import { schema } from './../validation/singIn';
interface ISingIn {
  identifier: string;
  password: string;
}
type Response = {
  token: string;
  refreshToken: RefreshToken;
};
type RefreshToken = {
  id: string;
  userId: string;
  expiresIn: number;
};
export const SingIn = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const handleSingIn = async (dataValues: ISingIn) => {
    setIsLoading(true);
    try {
      const { data } = await api.post<Response>(
        '/auth/login',
        dataValues
      );
      createStorage({
        expiresIn: dayjs().add(55, 'seconds').unix(),
        initialValue: data.token,
        key: 'token'
      });
      createStorage({
        expiresIn: dayjs().add(15, 'days').unix(),
        initialValue: data.refreshToken.userId,
        key: 'id'
      });
      createStorage({
        expiresIn: dayjs().add(15, 'days').unix(),
        initialValue: data.refreshToken.id,
        key: 'refreshToken'
      });
      navigate('/products');
    } catch (error) {
      toast({
        title: 'Falha ao realizar o login!',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISingIn>({
    resolver: yupResolver(schema)
  });
  return (
    <>
      <ModalHeader fontFamily="Roboto" fontWeight={700}>
        Entre na sua conta
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(handleSingIn)}>
          <FormControl
            isInvalid={!!errors?.identifier}
            my={6}
          >
            <InputGroup>
              <InputLeftElement>
                <Envelope />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                autoComplete="email"
                {...register('identifier')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.identifier &&
                errors?.identifier?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.password}
            my={6}
          >
            <InputGroup>
              <InputLeftElement>
                <Lock />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Senha"
                id="password"
                autoComplete="current-password"
                errorBorderColor="red.500"
                {...register('password')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.password &&
                errors?.password?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            w="full"
            type="submit"
            isLoading={isLoading}
          >
            Logar
          </Button>
        </form>
      </ModalBody>
    </>
  );
};
