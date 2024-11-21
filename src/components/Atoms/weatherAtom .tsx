/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@chakra-ui/react";
import { WiCelsius } from "react-icons/wi";

interface IWeatherAtom {
  name: string;
  temperature?: number;
  icon: any;
  font: string;
  showMilli: boolean;
  showSecond: boolean;
}

export const WeatherAtom: React.FC<IWeatherAtom> = ({
  name,
  temperature,
  icon,
  font,
  showSecond,
  showMilli,
}) => {
  return (
    <Text
      style={{
        color: "#FEFEFE",
        textAlign: "end",
        fontSize: "2vw",
        fontFamily: `${font}, "sans-serif"`,
        justifyContent: showMilli || showSecond ? "center" : "flex-end",
        display: "flex",
      }}
    >
      {`${name} - `}
      {Math.floor(temperature || 0)}
      <WiCelsius />
      {icon}
    </Text>
  );
};
