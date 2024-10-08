import { Button, ButtonProps } from "@chakra-ui/react";

export const MenuButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      color={"teal.600 !important"}
      sx={{
        _hover: {
          backgroundColor: "teal.100", // Cor de fundo ao passar o mouse
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
