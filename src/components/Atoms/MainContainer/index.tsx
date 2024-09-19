import { Box, BoxProps, Flex } from "@chakra-ui/react";

export type MainContainerProps = {
  child?: React.ReactNode;
  internalLimit?: string;
  props?: BoxProps;
};

export const MainContainer: React.FC<MainContainerProps> = ({
  child,
  internalLimit,
  props,
}) => {
  return (
    <Box m={0} p={0} bgColor={"gray.700"} w={"100dvw"} h={"100dvh"}>
      <Flex {...props} maxW={ internalLimit || "1280px"}>
        {child}
      </Flex>
    </Box>
  );
};
