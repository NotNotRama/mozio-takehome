import { Flex } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <Flex flexDir="column" align="center" p={5} position="relative">
      <Spinner />
    </Flex>
  );
}
