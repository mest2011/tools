import { Box, BoxProps, Text, Divider, Spacer } from "@chakra-ui/react";
import { Menu } from "../Menu";

export const ContentContainer: React.FC<BoxProps> = ({
  children,
  title = "",
  ...props
}) => {
  return (
    <Box display="flex" my="1rem" w="100%" flexDirection="column" {...props}>
      <Menu />
      <Spacer m={{ base: 2, md: 4, lg: 6 }} />
      {title.length > 0 ? (
        <>
          <Text
            fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}
            color={"whiteAlpha.900"}
            fontWeight={"bold"}
          >
            {title}
          </Text>
          <Divider my={{ base: 3, md: 5, lg: 7 }} orientation="horizontal" />
        </>
      ) : (
        <></>
      )}
      {children}
    </Box>
  );
};
