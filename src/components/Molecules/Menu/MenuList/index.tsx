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
      <Flex position="relative">
        <ChakraMenuButton as={MenuButton}>Wallpaper</ChakraMenuButton>
        <ChakraMenuLIst
          position="absolute"
          bg="teal.100"
          color="teal.900"
          top={{ base: 10, lg: 14 }}
        >
          <MenuItem
            onClick={() => updateRoute("clock")}
            bg="teal.100"
            color="teal.900"
            _hover={{ background: "teal.200" }}
            _active={{ background: "teal.300" }}
          >
            Relógio
          </MenuItem>
        </ChakraMenuLIst>
      </Flex>
    </Menu>
  );
};
