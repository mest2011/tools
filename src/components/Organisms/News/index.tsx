/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Flex,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Heading,
  Text,
  Grid,
} from "@chakra-ui/react";
import htmlToJson from "../../../utils/html_parser";
import { Button } from "../../Atoms/Button";
import useNews from "../../../hooks/news";

export const News: React.FC = () => {
  const { news } = useNews();

  //   useEffect(() => {
  //     const json = xmlToJson(canaltechRssResponse);
  //     setNews(json?.rss?.channel?.item);
  //     console.log(json?.rss?.channel?.item);
  //   }, []);

  return (
    <Flex
      bg={"black"}
      w="100%"
      h={"100%"}
      position={"fixed"}
      top={0}
      left={0}
      zIndex={1}
      backgroundImage={
        "url(https://t.ctcdn.com.br/Ts580YLcnQMrTUCEQ4ixYXqyl-M=/700x394/smart/i929963.jpeg)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center"}
    >
      <Flex
        mt={"auto"}
        flexDir={"column"}
        gap={4}
        p={12}
        color={"white"}
        bgColor={"#000000ab"}
        backdropFilter={"blur(7px)"}
      >
        <Text fontSize={"5xl"} fontWeight={"bold"}>
          Cientista prometem mapear mais de 37,2 trilhões de células humanas em
          novo atlas
        </Text>
        <Text fontSize={"xl"}>
          O projeto Human Cell Atlas tem uma missão para lá de desafiadora:
          mapear todas as células de um ser humano, do momento em que ele começa
          a se desenvolver até a sua morte. A missão foi criada em 2016 e conta
          com um consórcio internacional de pesquisa colaborativa com 3,6 mil
          cientistas de 190 laboratórios ao redor do mundo.
        </Text>
        <Text fontSize={"xs"}>Canaltech - 2024-11-24 - Daniel Vila Nova </Text>
      </Flex>
    </Flex>
  );
};
