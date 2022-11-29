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
import { Lock, Envelope } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { api } from './../services/api';
import { schema } from './../validation/register';

interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export const Register = () => {
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const toast = useToast();
  const handleRegister = async (data: IRegister) => {
    setIsLoading(true);
    try {
      await api.post('/auth/create', data);
      toast({
        title: 'Cadastro realizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Falha ao realizar o cadastro!',
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
  } = useForm<IRegister>({
    resolver: yupResolver(schema)
  });
  return (
    <>
      <ModalHeader fontFamily="Roboto" fontWeight={700}>
        Crie uma conta
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl
            isInvalid={!!errors?.firstName}
            my={6}
          >
            <Input
              type="text"
              placeholder="Nome"
              id="firstName"
              autoComplete="given-name"
              errorBorderColor="red.500"
              {...register('firstName', {
                minLength: {
                  value: 6,
                  message:
                    'A senha deve ter no mínimo 6 caracteres'
                }
              })}
            />
            <FormErrorMessage>
              {errors?.firstName &&
                errors?.firstName?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.lastName}
            my={6}
          >
            <Input
              type="text"
              placeholder="Sobrenome"
              id="lastName"
              autoComplete="family-name"
              errorBorderColor="red.500"
              {...register('lastName')}
            />
            <FormErrorMessage>
              {errors?.lastName &&
                errors?.lastName?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.email} my={6}>
            <InputGroup>
              <InputLeftElement>
                <Envelope />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Email"
                autoComplete="email"
                id="email"
                {...register('email')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.email && errors?.email?.message}
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
                autoComplete="new-password"
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
            Cadastrar
          </Button>
        </form>
      </ModalBody>
    </>
  );
};
