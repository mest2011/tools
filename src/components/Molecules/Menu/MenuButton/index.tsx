import { forwardRef } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

export const MenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        color={"teal.600 !important"}
        sx={{
          _hover: {
            backgroundColor: "teal.200",
          },
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
