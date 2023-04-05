import * as React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  VStack,
  useColorModeValue,
  Link,
  Text,
  Stack,
} from "@chakra-ui/react";
import ChangeLanguageButton from "./ChangeLanguageButton";
import { useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const Header: React.FC = () => (
  <Box bg="gray.800" w="100%" p={4} color="white">
    <Container maxW="container.md">
      <Head>
        <title>Tamales Monarca</title>
        <meta
          name="description"
          content="Authentic Mexican restaurant specializing in tamales from Michoacán."
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Heading as="h1" size="lg">
        Tamales Monarca
      </Heading>
    </Container>
  </Box>
);

const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Box bg="gray.800" w="100%" p={4} color="white">
      <Container maxW="container.md">
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ base: "center", md: "start" }}
          spacing={{ base: 8, md: 0 }}
        >
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="lg">
              Tamales Monarca
            </Heading>
            <Link
              href="https://www.google.com/maps/search/?api=1&query=201+Commercial,+Emporia,+Kansas,+66801"
              isExternal
              color="white"
            >
              201 Commercial
              <br />
              Emporia, Kansas, 66801
            </Link>
          </VStack>
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="lg">
              Contact
            </Heading>
            {language == "en" ? (
              <Link href="tel:+1-620-344-7424" color="white">
                +1 (620) 344-7424
              </Link>
            ) : (
              <Link href="tel:+1-620-344-7115" color="white">
                +1 (620) 344-7115
              </Link>
            )}
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const backgroundColor = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(0, 0, 0, 0.9)"
  );

  return (
    <VStack minHeight="100vh" justifyContent="space-between">
      <Header />
      <Box as="main" maxW="container.xl" p={8} position="relative">
        <Box position="absolute" right="0" top="0">
          <ChangeLanguageButton />
        </Box>
        <Container
          maxW="container.md"
          p={4}
          borderRadius="md"
          backgroundColor={backgroundColor}
          boxShadow="xl"
          fontSize={{ base: "md", md: "lg" }}
          fontFamily="Inter, sans-serif"
          lineHeight={{ base: "1.5", md: "1.8" }}
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </VStack>
  );
};

export default Layout;
