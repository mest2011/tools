/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  CircularProgress,
  Flex,
  Progress,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useNews from "../../../hooks/news";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { forwardRef, useEffect, useState } from "react";
import html_parser from "../../../utils/html_parser";
import { useGesture } from "@use-gesture/react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { extractSummary } from "../../../utils/extract_summary";
import { Card } from "./Card";

let notice_index = 0;

const MotionFlex = motion(
  forwardRef<HTMLDivElement, any>((props, ref) => <Flex ref={ref} {...props} />)
);

let interval: any;

export const News: React.FC = () => {
  const [notice, setNotice] = useState<any>();
  const [progressTime, setProgressTime] = useState(0);

  const { news, loading } = useNews();

  const changeNotice = () => {
    if (notice_index >= news.length - 1) {
      notice_index = -1;
    }
    handleRestartCounterTime();

    notice_index++;
    setNotice(news[notice_index]);
  };

  const handle = useFullScreenHandle();

  const bind = useGesture({
    onDoubleClick: () => {
      handleFullScreen(handle.active);
    },
  });

  const handleFullScreen = (fullScreen: boolean) => {
    fullScreen ? handle.exit() : handle.enter();
  };

  const handleRestartCounterTime = () => {
    setProgressTime(0);
    clearInterval(interval);

    interval = setInterval(() => {
      setProgressTime((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          changeNotice();
          return 100;
        }
        return prev + 0.05;
      });
    }, 10);

    return () => clearInterval(interval);
  };

  const handleFirstNotice = () => {
    notice_index = 0;
    setNotice(news[notice_index]);
  };

  useEffect(() => {
    if (news?.length > 0) {
      handleFirstNotice();
      handleRestartCounterTime();
    }
  }, [news]);

  return (
    <Flex flexDir={"column"} gap={10}>
      {news?.length > 0 && (
        <Skeleton isLoaded={!loading} borderRadius={handle.active ? 0 : "lg"}>
          <Flex
            bg={"black"}
            position={handle.active ? "fixed" : "relative"}
            left={0}
            top={0}
            height={"100%"}
            width={"100%"}
            onClick={() => {
              handleRestartCounterTime();
              if (handle.active) return;
              handleFullScreen(false);
            }}
            {...bind()}
          >
            <FullScreen handle={handle}>
              <MotionFlex
                key={notice?.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                bg={"black"}
                w="100%"
                h={"100%"}
                zIndex={1}
                backgroundImage={`url(${
                  html_parser(notice?.description)[0]?.children[0]?.attributes
                    ?.src
                })`}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                display={"flex"}
                flexDirection={"column"}
              >
                <CircularProgress
                  value={progressTime}
                  position={"fixed"}
                  top={4}
                  left={4}
                  size="84px"
                  color="teal.400"
                  trackColor="transparent"
                  capIsRound
                  display={handle.active ? "block" : "none"}
                >
                  <Avatar
                    name="Canaltech"
                    size="lg"
                    src="https://img.canaltech.com.br/canaltech-512.png"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                  />
                </CircularProgress>
                <MotionFlex
                  initial={
                    handle.active
                      ? { y: "100%", opacity: 0 }
                      : { y: "10%", opacity: 50 }
                  }
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  mt={"auto"}
                  flexDir={"column"}
                  gap={4}
                  p={12}
                  color={"white"}
                  bgColor={"#000000ab"}
                  backdropFilter={"blur(7px)"}
                >
                  <Text fontSize={"5xl"} fontWeight={"bold"}>
                    {notice?.title}
                  </Text>
                  <Text
                    fontSize={"xl"}
                    overflow={"hidden"}
                    display={"-webkit-box"}
                    textOverflow={"ellipsis"}
                    css={{
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(notice?.link, "_blank");
                    }}
                  >
                    <BsBoxArrowInUpRight />
                    {extractSummary(html_parser(notice?.description))}
                  </Text>
                  <Flex justifyContent={"space-between"}>
                    <Text fontSize={"xs"} fontWeight={600}>
                      Canaltech
                    </Text>
                    <Text fontSize={"xs"} fontWeight={600}>
                      {notice?.["dc:creator"]} -{" "}
                      {new Date(notice?.pubDate).toLocaleDateString()}
                    </Text>
                  </Flex>
                </MotionFlex>
                <Progress
                  value={progressTime}
                  width={"100%"}
                  size={"xs"}
                  display={handle.active ? "none" : "block"}
                  colorScheme="teal"
                  isAnimated
                  bgColor={"#000000ab"}
                  backdropFilter={"blur(7px)"}
                />
              </MotionFlex>
            </FullScreen>
          </Flex>
        </Skeleton>
      )}
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {news?.map((notice: any, index: number) => (
          <Card key={index} index={index} notice={notice} />
        )) ||
          [1, 2, 3, 4, 5].map((_) => (
            <Skeleton isLoaded={false} borderRadius={"lg"}>
              <Card h={"400px"} w={"200px"} index={_} notice={news[_]} />
            </Skeleton>
          ))}
      </SimpleGrid>
    </Flex>
  );
};
