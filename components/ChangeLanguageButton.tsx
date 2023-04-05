// components/ChangeLanguageButton.tsx
import { Button } from "@chakra-ui/react";
import { useLanguage } from "../contexts/LanguageContext";

const ChangeLanguageButton: React.FC = () => {
  const { changeLanguage, language } = useLanguage();

  return (
    <Button
      colorScheme="blue"
      onClick={() => changeLanguage(language === "en" ? "es" : "en")}
    >
      {language === "en" ? "Traducir al Español" : "Translate to English"}
    </Button>
  );
};

export default ChangeLanguageButton;
