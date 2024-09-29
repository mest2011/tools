import { Box, BoxProps, ButtonGroup } from "@chakra-ui/react";
import { MenuButton } from "./MenuButton";

export const pageList = ["password", "text", "ip", "date"];

export interface MenuProps extends BoxProps {
  changePage: (page: string) => void;
}

export const Menu: React.FC<MenuProps> = ({ changePage, ...props }) => {
  return (
    <Box {...props}>
      <ButtonGroup
        size={{ base: "sm", md: "md", lg: "lg" }}
        colorScheme="teal"
        variant="ghost"
        flexWrap={"wrap"}
      >
        <MenuButton
          border={"1px teal dashed"}
          onClick={() => (window.location.href = "/")}
        >
          Home
        </MenuButton>
        <MenuButton onClick={() => changePage(pageList[1])}>
          Transformador de Texto
        </MenuButton>
        <MenuButton onClick={() => changePage(pageList[3])}>
          Manipulador de Data
        </MenuButton>
        <MenuButton onClick={() => changePage(pageList[2])}>Meu IP</MenuButton>
        <MenuButton onClick={() => changePage(pageList[0])}>
          Gerador de Senha
        </MenuButton>
      </ButtonGroup>
    </Box>
  );
};
