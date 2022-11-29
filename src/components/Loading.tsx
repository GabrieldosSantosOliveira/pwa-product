import { Center, Spinner } from '@chakra-ui/react';
export const Loading = () => {
  return (
    <Center w="full" bg="gray.800" minH="100vh" flex={1}>
      <Spinner size="xl" color="cyan.500" />
    </Center>
  );
};
