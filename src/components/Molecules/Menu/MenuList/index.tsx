import {
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuLIst,
  Flex,
  Menu,
  MenuItem,
} from "@chakra-ui/react";
import { MenuButton } from "../MenuButton";
import { useRouteContext } from "../../../../providers/router";

export const MenuList: React.FC = () => {
  const { updateRoute } = useRouteContext();

  return (
    <Menu colorScheme="teal">
      <Flex>
        <ChakraMenuButton as={MenuButton}>Wallpaper</ChakraMenuButton>
        <ChakraMenuLIst
          bg="teal.100"
          color="teal.900"
          _hover={{
            background: "teal.800",
            color: "teal.200",
          }}
        >
          <MenuItem
            onClick={() => updateRoute("clock")}
            bg="transparent"
            color="teal.900"
            _hover={{
              color: "teal.200",
            }}
          >
            Relógio
          </MenuItem>
        </ChakraMenuLIst>
      </Flex>
    </Menu>
  );
};
