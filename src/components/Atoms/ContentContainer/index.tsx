import { Box, BoxProps } from "@chakra-ui/react";

export const ContentContainer: React.FC<BoxProps> = ({
  children,
  ...props
}) => {
  return (
    <Box display="flex" my="3rem" w="100%" flexDirection="column" {...props}>
      {children}
    </Box>
  );
};
