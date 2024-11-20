import { Text } from "@chakra-ui/react";
import { WiCelsius } from "react-icons/wi";

interface IWeatherAtom {
  name: string;
  temperature?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  font: string;
}

export const WeatherAtom: React.FC<IWeatherAtom> = ({
  name,
  temperature,
  icon,
  font,
}) => {
  return (
    <Text
      style={{
        color: "#FEFEFE",
        textAlign: "end",
        fontSize: "2vw",
        fontFamily: `${font}, "sans-serif"`,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {`${name} - `}
      {Math.floor(temperature || 0)}
      <WiCelsius />
      {icon}
    </Text>
  );
};
