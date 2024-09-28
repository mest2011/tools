import { TextareaProps, Textarea as ChakraTextarea, useTheme } from "@chakra-ui/react";

export const Textarea: React.FC<TextareaProps> = ({ ...props }) => {
    const theme = useTheme();

  return (
    <ChakraTextarea
      rows={5}
      color={"white"}
      textColor={"white"}
      bgColor={"teal"}
      borderColor={"teal"}
      _placeholder={{ color: theme.colors.gray[300] }}
      w={"100%"}
      {...props}
    />
  );
};
