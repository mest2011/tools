import { AccordionProps, Accordion as ChakraAccordion } from "@chakra-ui/react";

export const Accordion: React.FC<AccordionProps> = ({ children, ...props }) => {
  return (
    <ChakraAccordion
      allowToggle
      color="whiteAlpha.900"
      bgColor="teal.500"
      borderRadius="10px"
      borderColor="transparent"
      {...props}
    >
      {children}
    </ChakraAccordion>
  );
};
