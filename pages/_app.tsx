import MainLayout from "@/components/MainLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <LanguageProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </LanguageProvider>
    </ChakraProvider>
  );
}
