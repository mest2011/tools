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
    <Grid templateColumns="repeat(3, 1fr)" gap={6} width="100%" padding="2rem">
      {news ? (
        news.map((item: any) => {
          return (
            <>
              {console.log(
                JSON.stringify(htmlToJson(item.description)[1].children[0])
              )}
              <Card maxW="sm" bg={"gray.900"}>
                <CardBody>
                  <Image
                    src={`${
                      htmlToJson(item.description)[0].children[0].attributes.src
                    }`}
                    alt={item.title}
                    borderRadius="lg"
                  />
                  <Flex
                    mt="6"
                    gap={3}
                    flexDir={"column"}
                    justifyContent={"space-between"}
                  >
                    <Heading size="md" color={"gray.200"}>
                      {item.title}
                    </Heading>
                    <Text color="gray.100" fontSize="sm">
                      By: {item["dc:creator"]} •{" "}
                      {new Date(item.pubDate).toLocaleDateString()}
                    </Text>
                    <Text color="gray.100" fontSize="10px">
                      Font: Canaltech
                    </Text>
                  </Flex>
                </CardBody>
                <Divider color={"gray.400"} />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      as="a"
                      href={item.link}
                      target="_blank"
                      variant="solid"
                      colorScheme="teal"
                    >
                      Leia mais
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </>
          );
        })
      ) : (
        <Text fontSize="4xl" fontFamily="Roboto, sans-serif">
          Loading...
        </Text>
      )}
    </Grid>
  );
};
