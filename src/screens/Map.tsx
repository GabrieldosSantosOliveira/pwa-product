import { Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
export const Map = () => {
  const [position, setPosition] = useState('');
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setPosition(
            `http://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&z=16&output=embed`
          );
        },
        error => {
          switch (error.code) {
            case 0:
              console.log('Erro desconhecido');
              break;
            case 1:
              console.log('Permissão negada pelo usuário');
              break;
            case 2:
              console.log('Posição não está disponível');
              break;
            case 3:
              console.log('Tempo de requisição esgotado');
              break;
          }
          setPosition(
            `http://maps.google.com/maps?q=-22.2520202,-53.3372321&z=16&output=embed`
          );
        }
      );
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Center minH="100vh">
      <iframe
        id="mapa"
        title="Mapa"
        src={position}
        onClick={getLocation}
        style={{ width: '100%', height: '100vh' }}
      ></iframe>
    </Center>
  );
};
