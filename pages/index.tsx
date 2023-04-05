// pages/index.tsx
import { Container, Heading, Text, VStack, Stack } from "@chakra-ui/react";
import { useLanguage } from "../contexts/LanguageContext";

const Home: React.FC = () => {
  const { language } = useLanguage();

  const menuItems = [
    {
      en: "Pork in Red Sauce",
      es: "Puerco en Salsa Roja",
    },
    {
      en: "Chicken in Green Sauce",
      es: "Pollo en Salsa Verde",
    },
    {
      en: "Jalapeno Pepper with Cheese",
      es: "Raja de Jalapeño con Queso",
    },
    {
      en: "Sweet Strawberry",
      es: "Dulce con Fresa",
    },
    {
      en: "Sweet Pineapple",
      es: "Dulce con Piña",
    },
  ];

  return (
    <Container maxW="container.md" p={4} borderRadius="md">
      <VStack spacing={8}>
        <Heading as="h2" size="xl">
          {language === "en" ? "Tamales Monarca" : "Tamales Monarca"}
        </Heading>
        <Text>
          {language === "en" ? (
            <>
              Tamales Monarca is a family-owned Mexican restaurant in Emporia,
              Kansas, specializing in traditional tamales from the state of
              Michoacán. Our recipes have been passed down for generations, and
              we take great pride in using only the freshest ingredients to
              create our delicious and authentic dishes.
              <br />
              <br />
              Our restaurant is designed to provide a warm and welcoming
              atmosphere for families and friends to gather and enjoy a meal
              together. Come visit us today and experience the taste of true
              Mexican tradition!
            </>
          ) : (
            <>
              Tamales Monarca es un restaurante mexicano familiar en Emporia,
              Kansas, que se especializa en tamales tradicionales del estado de
              Michoacán. Nuestras recetas se han transmitido de generación en
              generación y nos enorgullecemos de utilizar solo los ingredientes
              más frescos para crear nuestros deliciosos y auténticos platos.
              <br />
              <br />
              Nuestro restaurante está diseñado para brindar un ambiente cálido
              y acogedor para que las familias y los amigos se reúnan y
              disfruten de una comida juntos. ¡Ven a visitarnos hoy y
              experimenta el sabor de la verdadera tradición mexicana!
            </>
          )}
        </Text>

        <Heading as="h3" size="lg">
          {language === "en" ? "Available Tamales" : "Tamales Disponibles"}
        </Heading>
        <Stack spacing={2}>
          {menuItems.map((item, index) => (
            <Text key={index}>{item[language]}</Text>
          ))}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Home;
