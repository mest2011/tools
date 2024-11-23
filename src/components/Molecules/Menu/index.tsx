import { Box, BoxProps, ButtonGroup } from "@chakra-ui/react";
import { MenuButton } from "./MenuButton";
import { MenuList } from "./MenuList";
import { useRouteContext } from "../../../providers/router";
import { pageList } from "../../../model/constants/pages";

export const Menu: React.FC<BoxProps> = ({ ...props }) => {
  const { updateRoute } = useRouteContext();

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
        <MenuButton onClick={() => updateRoute(pageList[1])}>
          Transformador de Texto
        </MenuButton>
        <MenuButton onClick={() => updateRoute(pageList[3])}>
          Manipulador de Data
        </MenuButton>
        <MenuButton onClick={() => updateRoute(pageList[2])}>Meu IP</MenuButton>
        <MenuButton onClick={() => updateRoute(pageList[0])}>
          Gerador de Senha
        </MenuButton>
        <MenuList />
        <MenuButton onClick={() => updateRoute(pageList[5])}>
          Notícias
        </MenuButton>
      </ButtonGroup>
    </Box>
  );
};
