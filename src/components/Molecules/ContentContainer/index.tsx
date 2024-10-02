import { Box, BoxProps, Text, Divider } from "@chakra-ui/react";
import { useEffect } from "react";

export const ContentContainer: React.FC<BoxProps> = ({
  children,
  title = "",
  ...props
}) => {
  useEffect(() => {
    document.title = title ? `🛠 - ${title}` : "Ferramentas - 🛠";
  }, [title]);

  return (
    <Box display="flex" my="1rem" w="100%" flexDirection="column" {...props}>
      {title.length > 0 ? (
        <>
          <Text
            fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}
            color={"whiteAlpha.900"}
            fontWeight={"bold"}
          >
            {title}
          </Text>
          <Divider
            my={{ base: 3, md: 5, lg: 7 }}
            orientation="horizontal"
            borderColor={"white !important"}
          />
        </>
      ) : (
        <></>
      )}
      {children}
    </Box>
  );
};
