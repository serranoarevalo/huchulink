import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import {
  Box,
  Center,
  Container,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  url: string;
}

const Home: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("");
  const onValid = async ({ url }: IForm) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://huchu.nomadcoders.workers.dev/?url=${url}`,
        {
          method: "POST",
        }
      );
      const { key } = await response.json();
      setKey(key);
      setLoading(false);
    } catch (e) {
      setError("url", { message: "Could not process URL." });
    }
  };
  const onCopy = () => {
    navigator.clipboard.writeText(`https://huchu.link/${key}`);
  };
  return (
    <Box bg="gray.900" minH="100vh" pt="4" color="white">
      <Head>
        <title>후추.링크</title>
        <link rel="icon" href="/assets/favicon.ico" />
        <meta name="description" content="Free easy to use link shortener." />
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
              placeholder="Paste your 링크 here :)"
              borderColor="gray.100"
              borderWidth="2px"
              _placeholder={{ color: "gray.50" }}
            />
            <Button
              isLoading={loading}
              disabled={loading}
              size="lg"
              colorScheme="pink"
              type="submit"
            >
              Shorten
            </Button>
          </HStack>
          <HStack mt="5" fontWeight="500" textAlign="center">
            {key !== "" && (
              <HStack>
                <Text color="white">Done! Here is your URL: </Text>
                <Text as="span" color="pink.400">
                  <Text textDecoration="underline">
                    https://huchu.link/{key}
                  </Text>
                </Text>
                <Button
                  onClick={onCopy}
                  variant="outline"
                  colorScheme="pink"
                  size="sm"
                >
                  Copy
                </Button>
              </HStack>
            )}
            <Text color="red.500">{errors?.url?.message}</Text>
          </HStack>
        </VStack>
      </Container>
      <Box
        position="absolute"
        bottom="10"
        left="0"
        right="0"
        textAlign="center"
      >
        <Text as="span">
          With 💖 by{" "}
          <Link
            borderBottomColor="pink.500"
            borderBottomWidth="1px"
            _hover={{ textDecoration: "none", color: "pink.500" }}
            href="https://github.com/serranoarevalo"
            target="_blank"
          >
            @serranoarevalo
          </Link>
        </Text>
      </Box>
      <style global jsx>{`
        @import url(https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
        * {
          font-family: "Spoqa Han Sans Neo", "sans-serif";
        }
      `}</style>
    </Box>
  );
};

export default Home;
