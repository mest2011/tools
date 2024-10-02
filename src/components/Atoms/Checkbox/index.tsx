import { CheckboxProps, Checkbox as ChakraCheckbox } from "@chakra-ui/react";

export const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => {
  return (
    <ChakraCheckbox
      size={"md"}
      colorScheme={"teal"}
      iconColor={"white !important"}
      borderColor={"white !important"}
      {...props}
    >
      {children}
    </ChakraCheckbox>
  );
};
