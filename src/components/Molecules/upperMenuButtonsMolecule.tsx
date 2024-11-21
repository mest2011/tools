import { Box } from "@chakra-ui/react";
import { Button } from "../Atoms/Button";
import { BsHouse, BsArrowRepeat } from "react-icons/bs";

interface IUpperMenuButtonsMolecule {
  showControls: boolean;
}

export const UpperMenuButtonsMolecule: React.FC<IUpperMenuButtonsMolecule> = ({
  showControls,
}) => {
  return (
    <Box
      style={{
        position: "fixed",
        top: 32,
        left: 0,
        width: "100dvw",
        display: showControls ? "flex" : "none",
        justifyContent: "space-around",
        zIndex: 2,
      }}
    >
      <a href="https://mesttech.com.br" style={{ textDecoration: "none" }}>
        <Button
          variant="outline"
          p="1.5rem"
          _hover={{ background: "teal.600" }}
        >
          <BsHouse />
        </Button>
      </a>
      <Button
        onClick={() => window.location.reload()}
        variant="outline"
        p="1.5rem"
        _hover={{ background: "teal.600" }}
      >
        <BsArrowRepeat />
      </Button>
    </Box>
  );
};
