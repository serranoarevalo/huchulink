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
import { useForm } from "react-hook-form";

interface IForm {
  url: string;
}

const Home: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();
  const onValid = async ({ url }: IForm) => {
    const response = await fetch(
      `https://huchu.nomadcoders.workers.dev/?url=${url}`,
      {
        method: "POST",
      }
    );
    console.log(await response.json());
  };
  return (
    <Box bg="gray.900" minH="100vh" pt="4" color="white">
      <Head>
        <title>후추.링크</title>
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <Container pt="28">
        <VStack spacing={"8"}>
          <Text
            fontSize="5xl"
            textAlign="center"
            textColor="pink.400"
            fontWeight="600"
          >
            후추 링크
          </Text>
          <HStack
            as="form"
            onSubmit={handleSubmit(onValid)}
            spacing="3"
            w="100%"
          >
            <Input
              {...register("url", {
                required: true,
                pattern: {
                  value:
                    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                  message: "Please write a valid URL",
                },
              })}
              size="lg"
              _invalid={{ borderColor: "red.500" }}
              isInvalid={Boolean(errors.url)}
              colorScheme="pink"
              placeholder="Shorten your link"
              borderColor="gray.100"
              borderWidth="2px"
              _placeholder={{ color: "gray.50" }}
            />
            <Button size="lg" colorScheme="pink" type="submit">
              Shorten
            </Button>
          </HStack>

          <Text color="red.500" mt="5" fontWeight="500">
            {errors?.url?.message}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
