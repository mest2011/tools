import { SliderProps as ChakraSliderProps, Slider as ChakraSlider, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from "@chakra-ui/react";

export interface SliderProps extends ChakraSliderProps {
    showTooltip: boolean;
    label: string;
}

export const Slider: React.FC<SliderProps> = ({ showTooltip, label, ...props }) => {
  return (
    <ChakraSlider
      defaultValue={8}
      min={1}
      max={96}
      width={"100%"}
      colorScheme="teal"
      border="10px black"
      css={{
        "& > div:first-of-type > div:first-of-type ": {
          height: "200%",
        },
      }}
      { ...props }
    >
      <SliderTrack bg="teal.100">
        <SliderFilledTrack bg="teal.600" />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.600"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={label}
      >
        <SliderThumb />
      </Tooltip>
    </ChakraSlider>
  );
};
