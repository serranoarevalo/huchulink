import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import {
  Box,
  Center,
  Container,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <Center bg="gray.900" minH="100vh" pt="4" color="white">
      <Head>
        <title>후추.링크</title>
      </Head>
      <Container>
        <VStack spacing={"8"}>
          <Text
            fontSize="5xl"
            textAlign="center"
            textColor="pink.400"
            fontWeight="600"
          >
            후추 링크
          </Text>
          <Box
            w={["100%", "100%", "50%", "50%", "30%"]}
            mt="5"
            justifyContent="center"
            display="flex"
          >
            <HStack spacing="3" w="100%">
              <Input
                colorScheme="pink"
                placeholder="Shorten your link"
                borderColor="gray.100"
              />
              <Button colorScheme="pink">Shorten</Button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Center>
  );
};

export default Home;
