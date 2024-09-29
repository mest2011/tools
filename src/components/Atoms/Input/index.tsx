import {
  FormControl,
  Input as ChakraInput,
  InputProps,
  useTheme,
} from "@chakra-ui/react";

export const Input: React.FC<InputProps> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <FormControl>
      <ChakraInput
        width="100%"
        color="whiteAlpha.900"
        _placeholder={{ color: theme.colors.gray[300] }}
        bgColor="teal.500"
        {...props}
      />
    </FormControl>
  );
};
