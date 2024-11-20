import { Box } from "@chakra-ui/react";
import { Button } from "../Atoms/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  BsCalendar2Date,
  BsFullscreen,
  BsFullscreenExit,
  BsStopwatch,
  BsStopwatchFill,
  BsThermometerLow,
} from "react-icons/bs";

interface ILowerMenuButtonsMolecule {
  isFullScreen: boolean;
  showControls: boolean;
  setShowDate: () => void;
  setShowMilli: () => void;
  setShowSecond: () => void;
  handleNextFont: () => void;
  setShowWeather: () => void;
  handleBeforeFont: () => void;
  handleFullScreen: () => void;
}

export const LowerMenuButtonsMolecule: React.FC<ILowerMenuButtonsMolecule> = ({
  isFullScreen,
  showControls,
  setShowDate,
  setShowMilli,
  setShowSecond,
  handleNextFont,
  setShowWeather,
  handleBeforeFont,
  handleFullScreen,
}) => {
  return (
    <Box
      style={{
        position: "fixed",
        bottom: 32,
        left: 0,
        width: "100dvw",
        display: showControls ? "flex" : "none",
        justifyContent: "space-around",
        flexWrap: "wrap",
        
      }}
    >
      <Button
        onClick={handleBeforeFont}
        variant="outline"
        _hover={{ background: "teal.400" }}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        onClick={handleNextFont}
        variant="outline"
        _hover={{ background: "teal.400" }}
      >
        <ArrowRightIcon />
      </Button>
      <Button
        onClick={setShowWeather}
        variant="outline"
        _hover={{ background: "teal.400" }}
      >
        <BsThermometerLow />
      </Button>
      <Button
        onClick={setShowDate}
        variant="outline"
        _hover={{ background: "teal.400" }}
      >
        <BsCalendar2Date />
      </Button>
      <Button
        onClick={setShowSecond}
        variant="outline"
        _hover={{ background: "teal.400" }}
      >
        <BsStopwatch />
      </Button>
      <Button
        onClick={setShowMilli}
        variant="outline"
        _hover={{ background: "teal.400" }}
      >
        <BsStopwatchFill />
      </Button>
      <Button
        onClick={handleFullScreen}
        variant="outline"
        _hover={{ background: "teal.400" }}
      >
        {isFullScreen ? <BsFullscreen /> : <BsFullscreenExit />}
      </Button>
    </Box>
  );
};
