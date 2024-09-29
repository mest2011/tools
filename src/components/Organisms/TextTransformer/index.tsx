import {
  Box,
  FormControl,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ContentContainer } from "../../Molecules/ContentContainer";
import { Textarea } from "../../Atoms/Textarea";

/* eslint-disable react-hooks/exhaustive-deps */
export const TextTransformer: React.FC = () => {
  const [text, setText] = useState<string>();
  const [textConverted, setTextConverted] = useState<string>();
  const [convertType, setConvertType] = useState("uppercase");
  const toast = useToast();

  useEffect(() => {
    convertText();
  }, [text, convertType]);

  const convertText = () => {
    if (!text) return setTextConverted("");
    let convertedText: string = text;

    switch (convertType) {
      case "uppercase":
        convertedText = text.toUpperCase();
        break;
      case "lowercase":
        convertedText = text.toLowerCase();
        break;
      case "normilize":
        convertedText = text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-");
        break;
      case "capitalize":
        convertedText = text
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        break;
      case "alternating":
        convertedText = text
          .split("")
          .map((char, index) =>
            index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
          )
          .join("");
        break;
      case "invert-case":
        convertedText = text
          .split("")
          .map((char) =>
            char === char.toUpperCase()
              ? char.toLowerCase()
              : char.toUpperCase()
          )
          .join("");
        break;
      case "camel-case":
        convertedText = text
          .toLowerCase()
          .split(" ")
          .map((word, index) =>
            index === 0
              ? word.toLowerCase()
              : word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join("");
        break;
      case "snake-case":
        convertedText = text.split(" ").join("_").toLowerCase();
        break;
      case "kebab-case":
        convertedText = text.split(" ").join("-").toLowerCase();
        break;
      case "pascal-case":
        convertedText = text
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");
        break;
    }

    setTextConverted(convertedText.trim());
  };

  const copyToClipBoard = () => {
    if (!textConverted) return;

    navigator.clipboard.writeText(textConverted);

    toast({
      title: "Copiado!",
      description: "Dados copiados para área de transferência.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <ContentContainer title="Trasformador de textos">
      <Box display="flex" flexDirection="column">
        <Box display="flex" gap={3} padding={3} flexDirection="column">
          <Box
            display="flex"
            flexDirection="column"
            margin="auto"
            gap={6}
            width="100%"
          >
            <Textarea
              rows={5}
              placeholder="Original"
              value={text}
              color="primary"
              style={{ width: "100%" }}
              id="outlined-multiline-static"
              onChange={(e) => setText(e.target.value)}
            />
            <Textarea
              rows={5}
              placeholder="Convertido"
              value={textConverted}
              color="success"
              style={{ width: "100%" }}
              id="outlined-multiline-static"
              onClick={copyToClipBoard}
            />
            <FormControl>
              <Box display="flex" flexDirection="column" gap={2}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="uppercase"
                  name="radio-buttons-group"
                  display="flex"
                  gap={3}
                  flexWrap="wrap"
                  colorScheme="teal"
                  color="white"
                  onChange={(e) => setConvertType(e)}
                >
                  <Radio value="uppercase">MAIÚSCULO</Radio>
                  <Radio value="lowercase">minúsculo</Radio>
                  <Radio value="normilize">Normalizado</Radio>
                  <Radio value="capitalize">Capitalizado</Radio>
                  <Radio value="alternating">AlTeRnAdO</Radio>
                  <Radio value="invert-case">iNVERTER</Radio>
                  <Radio value="camel-case">camelCase</Radio>
                  <Radio value="snake-case">snake_case</Radio>
                  <Radio value="kebab-case">kebab-case</Radio>
                  <Radio value="pascal-case">PascalCase</Radio>
                </RadioGroup>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </ContentContainer>
  );
};
