import { Box, BoxProps } from "@chakra-ui/react";

export interface MainContainerProps extends BoxProps {
  children: React.ReactNode;
  internalLimit?: string;
  props?: BoxProps;
}

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  internalLimit,
  ...props
}) => {
  return (
    <Box m={0} p={0} bgColor={"gray.700"} w={"100dvw"} h={"100dvh"}>
      <Box maxW={internalLimit || "1280px"} m="auto" px="3rem" {...props}>
        {children}
      </Box>
    </Box>
  );
};
