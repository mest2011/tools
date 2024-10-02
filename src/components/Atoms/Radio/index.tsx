import { RadioProps, Radio as ChakraRadio } from "@chakra-ui/react";

export const Radio: React.FC<RadioProps> = ({ children, ...props }) => {
  return (
    <ChakraRadio
      size={"md"}
      color={"white !important"}
      borderColor={"white !important"}
      {...props}
    >
      {children}
    </ChakraRadio>
  );
};
