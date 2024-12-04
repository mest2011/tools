/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CardProps as ChakraCardProps,
  Card as ChakraCard,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import html_parser from "../../../../utils/html_parser";
import { extractSummary } from "../../../../utils/extract_summary";

export interface CardProps extends ChakraCardProps {
  index: number;
  notice: any;
}

export const Card: React.FC<CardProps> = ({ index, notice }) => {
  return (
    <ChakraCard
      key={index}
      onClick={() => window.open(notice?.link, "_blank")}
      borderRadius={"lg"}
      cursor={"pointer"}
      maxH={"400px"}
      bg={"gray.900"}
      color={"gray.100"}
    >
      <Image
        src={html_parser(notice?.description)[0]?.children[0]?.attributes?.src}
        objectFit={"cover"}
        height={"200px"}
        borderTopLeftRadius={"lg"}
        borderTopRightRadius={"lg"}
      />
      <Flex
        flexDirection="column"
        p={3}
        gap={2}
        justifyContent={"space-between"}
        h={"100%"}
      >
        <Text fontSize={"md"} fontWeight={"bold"}>
          {notice?.title}
        </Text>
        <Text
          fontSize={"xs"}
          overflow={"hidden"}
          display={"-webkit-box"}
          textOverflow={"ellipsis"}
          css={{ WebkitLineClamp: 5, WebkitBoxOrient: "vertical" }}
          color={"gray.300"}
        >
          {extractSummary(html_parser(notice?.description))}
        </Text>
        <Flex justifyContent={"space-between"} gap={1}>
          <Text fontSize={"10px"} fontWeight={300}>
            Fonte: Canaltech
          </Text>
          <Text fontSize={"10px"} fontWeight={300}>
            {notice?.["dc:creator"]} -{" "}
            {new Date(notice?.pubDate).toLocaleDateString()}
          </Text>
        </Flex>
      </Flex>
    </ChakraCard>
  );
};
