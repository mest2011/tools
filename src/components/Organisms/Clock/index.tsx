/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Cookies from "js-cookie";
import axios from "axios";
import { WeatherData, WeatherIcon } from "../../../model/weather";

import dayjs from "dayjs";
import { days, months } from "../../../model/constants/calendary";
import { fonts } from "../../../model/constants/fonts";
import { UpperMenuButtonsMolecule } from "../../Molecules/upperMenuButtonsMolecule";
import { Box, Text } from "@chakra-ui/react";
import { WeatherAtom } from "../../Atoms/weatherAtom ";
import { DateAtom } from "../../Atoms/dateAtom";
import { LowerMenuButtonsMolecule } from "../../Molecules/lowerMenuButtonsMolecule";
import { useGesture } from "@use-gesture/react";

export const Clock: React.FC = () => {
  const [showMilli, setShowMilli] = useState<boolean>(
    Cookies.get("showMilli") === "true"
  );
  const [showSecond, setShowSecond] = useState<boolean>(
    Cookies.get("showSecond") === "true"
  );
  const [showDate, setShowDate] = useState<boolean>(
    Cookies.get("showDate") === "true"
  );
  const [showDateTimeStamp, setShowDateTimeStamp] = useState<boolean>(
    Cookies.get("showDateTimeStamp") === "true"
  );
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showWeather, setShowWeather] = useState<boolean>(
    Cookies.get("showWeather") === "true"
  );

  const [font, setFont] = useState<string>(Cookies.get("font") || fonts[0]);

  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [monthWord, setMonthWord] = useState<string>();
  const [year, setYear] = useState<string>();
  const [dayOfWeek, setDayOfWeek] = useState<string>();

  const [hour, setHour] = useState<string>();
  const [minute, setMinute] = useState<string>();
  const [second, setSecond] = useState<string>();
  const [millisecond, setMillisecond] = useState<string>();
  const [weather, setWeather] = useState<WeatherData>();

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?id=3464975&lang=pt_br&appid=${
          import.meta.env.VITE_APP_OPEN_WEATHER_KEY
        }&units=metric`
      )
      .then((value) => setWeather(value.data));
  };

  useEffect(() => {
    Cookies.set("showMilli", showMilli ? "true" : "false");
    Cookies.set("showSecond", showSecond ? "true" : "false");
    Cookies.set("showDate", showDate ? "true" : "false");
    Cookies.set("showDateTimeStamp", showDateTimeStamp ? "true" : "false");
    Cookies.set("showWeather", showWeather ? "true" : "false");

    Cookies.set("font", font);
  }, [showMilli, showSecond, showDate, font, showDateTimeStamp]);

  const getTime = () => {
    setDay(dayjs(new Date()).format("DD"));
    setMonth(dayjs(new Date()).format("MM"));
    setMonthWord(
      getMonthPortuguese(parseInt(dayjs(new Date()).format("MM")) - 1)
    );
    setYear(dayjs(new Date()).format("YYYY"));
    setDayOfWeek(getDayWeekPortuguese(parseInt(dayjs(new Date()).format("d"))));

    setHour(dayjs(new Date()).format("HH"));
    setMinute(dayjs(new Date()).format("mm"));
    setSecond(dayjs(new Date()).format("ss"));
    setMillisecond(dayjs(new Date()).format("SSS"));
  };

  const handle = useFullScreenHandle();

  const bind = useGesture({
    onDoubleClick: () => {
      handleFullScreen(handle.active);
    },
    onClick: () => {
      showControlsHandler();
    },
  });

  const timeoutRef = useRef<NodeJS.Timeout>();

  const showControlsHandler = () => {
    setShowControls(true);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 5000);
  };

  useEffect(() => {
    setInterval(() => {
      getTime();
    }, 100);

    setInterval(() => {
      if (showWeather) getWeather();
    }, 1000 * 60 * 15);
  }, []);

  const getDayWeekPortuguese = (numberOfDay: number) => {
    return days[numberOfDay];
  };

  const getMonthPortuguese = (numberOfDay: number) => {
    return months[numberOfDay];
  };

  const handleFont = (next: boolean) => {
    const currentIndex = fonts.indexOf(font);

    if (next) {
      const nextIndex = (currentIndex + 1) % fonts.length;
      setFont(fonts[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + fonts.length) % fonts.length;
      setFont(fonts[prevIndex]);
    }
  };

  const handleFullScreen = (fullScreen: boolean) => {
    fullScreen ? handle.exit() : handle.enter();
  };

  return (
    <span {...bind()}>
      <FullScreen handle={handle}>
        <UpperMenuButtonsMolecule showControls={showControls} />
        <Box
          px={{ base: 12, md: 18, lg: 24 }}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#000",
            userSelect: "none",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          <Box
            style={{
              width: showSecond || showMilli ? "93%" : "auto",
              margin: "auto",
            }}
          >
            <Text
              style={{
                fontSize: "26vw",
                fontWeight: 600,
                lineHeight: "1",
                fontFamily: `${font}, "sans-serif"`,
                color: "#FEFEFE",
                textAlign: showSecond || showMilli ? "start" : "center",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span>{hour}</span>:<span>{minute}</span>
              {showSecond ? (
                <span
                  style={{ fontSize: "11vw" }}
                  onClick={() => setShowSecond(false)}
                >
                  :{second}
                </span>
              ) : (
                <></>
              )}
              {showMilli ? (
                <span
                  style={{ fontSize: "6vw" }}
                  onClick={() => setShowMilli(false)}
                >
                  .{millisecond}
                </span>
              ) : (
                <></>
              )}
            </Text>
            {showWeather ? (
              weather?.name !== undefined ? (
                <WeatherAtom
                  font={font}
                  showMilli={showMilli}
                  showSecond={showSecond}
                  icon={WeatherIcon[weather?.weather[0]?.icon || "000"]}
                  name={weather?.name}
                  temperature={weather?.main?.temp}
                />
              ) : (
                <Text
                  style={{
                    color: "#FEFEFE",
                    textAlign: showSecond || showMilli ? "center" : "end",
                    fontSize: "1.5vw",
                    fontFamily: `${font}, "sans-serif"`,
                  }}
                >
                  Erro ao buscar o clima
                </Text>
              )
            ) : (
              <></>
            )}
            {showDate ? (
              <DateAtom
                day={day}
                dayOfWeek={dayOfWeek}
                font={font}
                month={month}
                monthWord={monthWord}
                onClick={() => setShowDateTimeStamp(!showDateTimeStamp)}
                showDateTimeStamp={showDateTimeStamp}
                showMilli={showMilli}
                showSecond={showSecond}
                year={year}
              />
            ) : (
              <></>
            )}
          </Box>
        </Box>
        <LowerMenuButtonsMolecule
          handleBeforeFont={() => handleFont(false)}
          handleNextFont={() => handleFont(true)}
          setShowDate={() => setShowDate(!showDate)}
          setShowMilli={() => setShowMilli(!showMilli)}
          setShowSecond={() => setShowSecond(!showSecond)}
          setShowWeather={() => setShowWeather(!showWeather)}
          handleFullScreen={() => handleFullScreen(handle.active)}
          showControls={showControls}
          isFullScreen={handle.active}
        />
      </FullScreen>
    </span>
  );
};
