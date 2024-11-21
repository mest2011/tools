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
        zIndex: 2,
      }}
    >
      <Button
        onClick={handleBeforeFont}
        variant="outline"
        p="1.5rem"
        _hover={{ background: "teal.600" }}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        onClick={handleNextFont}
        variant="outline"
        p="1.5rem"
        _hover={{ background: "teal.600" }}
      >
        <ArrowRightIcon />
      </Button>
      <Button
        onClick={setShowWeather}
        variant="outline"
        p="1.5rem"
        _hover={{ background: "teal.600" }}
      >
        <BsThermometerLow />
      </Button>
      <Button
        onClick={setShowDate}
        variant="outline"
        p="1.5rem"
        _hover={{ background: "teal.600" }}
      >
        <BsCalendar2Date />
      </Button>
      <Button
        onClick={setShowSecond}
        variant="outline"
        p="1.5rem"
        _hover={{ background: "teal.600" }}
      >
        <BsStopwatch />
      </Button>
      <Button
        onClick={setShowMilli}
        variant="outline"
        p="1.5rem"
        _hover={{ background: "teal.600" }}
      >
        <BsStopwatchFill />
      </Button>
      <Button
        onClick={handleFullScreen}
        variant="outline"
        p="1.5rem"
        _hover={{ background: "teal.600" }}
      >
        {isFullScreen ? <BsFullscreen /> : <BsFullscreenExit />}
      </Button>
    </Box>
  );
};
