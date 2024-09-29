import { Box, ButtonGroup } from "@chakra-ui/react";
import { MenuButton } from "./MenuButton";

export const Menu: React.FC = () => {
  return (
    <Box>
      <ButtonGroup
        size={{ base: "sm", md: "md", lg: "lg" }}
        colorScheme="teal"
        variant="ghost"
      >
        <MenuButton
            border={"1px teal dashed"}
          onClick={() => (window.location.href = "/")}
        >
          Home
        </MenuButton>
        <MenuButton onClick={() => (window.location.href = "/text")}>
          Transformador de Texto
        </MenuButton>
        <MenuButton onClick={() => (window.location.href = "/date")}>
          Manipulador de Data
        </MenuButton>
        <MenuButton onClick={() => (window.location.href = "/ip")}>
          Meu IP
        </MenuButton>
        <MenuButton onClick={() => (window.location.href = "/password")}>
          Gerador de Senha
        </MenuButton>
      </ButtonGroup>
    </Box>
  );
};
