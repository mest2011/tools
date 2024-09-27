import {
  SwitchProps as ChakraSwitchProps,
  Switch as ChakraSwitch,
  useTheme,
} from "@chakra-ui/react";

export interface SwitchProps extends ChakraSwitchProps {
  checked: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  children,
  checked = true,
  ...props
}) => {
  const theme = useTheme();

  return (
    <ChakraSwitch
      size="sm"
      checked={checked}
      colorScheme="teal"
      {...props}
      css={{
        "& > span:first-of-type": { border: "2px solid white" },
        "& > span:first-of-type:not([data-checked])": {
          background: theme.colors.teal[500],
        },
      }}
    >
      {children}
    </ChakraSwitch>
  );
};
