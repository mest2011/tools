import {
  FormControl,
  Input as ChakraInput,
  InputProps,
} from "@chakra-ui/react";

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <FormControl>
      <ChakraInput
        width="100%"
        color="whiteAlpha.900"
        bgColor="teal.500"
        {...props}
      />
    </FormControl>
  );
};
