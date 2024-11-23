/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button as ButtonBase, ButtonProps } from "@chakra-ui/react";

export const Button: React.FC<ButtonProps | any> = ({ children, ...props }) => {
  return (
    <ButtonBase
      variant="solid"
      size="md"
      padding="0 3rem"
      colorScheme="teal"
      color="whiteAlpha.900"
      {...props}
    >
      {children}
    </ButtonBase>
  );
};
