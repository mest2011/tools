/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MainContainer } from "./components/Atoms/MainContainer";
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Radio,
  RadioGroup,
  useToast,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Slider,
  Switch,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import axiosBase from "axios";
import { Button } from "./components/Atoms/Button";
import { Input } from "./components/Atoms/Input";
import { Accordion } from "./components/Atoms/Accordion";

export const App: React.FC = () => {
  const [password, setPassword] = useState<string>();
  const [enableUpperChar, setEnableUpperChar] = useState(true);
  const [enableLowerChar, setEnableLowerChar] = useState(true);
  const [enableSpecialChar, setEnableSpecialChar] = useState(true);
  const [enableNumberChar, setEnableNumberChar] = useState(true);
  const [passwordLength, setPasswordLength] = useState(16);
  const [passwordType, setPasswordType] = useState("secure");
  const [advancedSettings, setAdvancedSettings] = useState(true);

  const axios = axiosBase.create();
  axios.defaults.timeout = 800;
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  useEffect(() => {
    generatePassword();
  }, []);

  useEffect(() => {
    generatePassword();
  }, [
    enableLowerChar,
    enableUpperChar,
    enableSpecialChar,
    enableNumberChar,
    passwordLength,
  ]);

  useEffect(() => {
    switch (passwordType) {
      case "readable":
        setEnableUpperChar(true);
        setEnableLowerChar(true);
        setEnableSpecialChar(false);
        setEnableNumberChar(false);
        setPasswordLength(8);
        break;
      case "secure":
        setEnableUpperChar(true);
        setEnableLowerChar(true);
        setEnableSpecialChar(true);
        setEnableNumberChar(true);
        setPasswordLength(16);
        break;
    }
  }, [passwordType]);

  const generatePassword = () => {
    if (
      !enableLowerChar &&
      !enableUpperChar &&
      !enableSpecialChar &&
      !enableNumberChar
    )
      return;

    const UpperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LowerChar = "abcdefghijklmnopqrstuvwxyz";
    const SpecialChar = "!@#$%^&*()";
    const NumberChar = "0123456789";
    let password = "";
    const enabledChars = `${enableUpperChar ? UpperChar : ""}${
      enableLowerChar ? LowerChar : ""
    }${enableSpecialChar ? SpecialChar : ""}${
      enableNumberChar ? NumberChar : ""
    }`;

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * enabledChars.length);
      password += enabledChars[randomIndex];
    }

    setPassword(password);
  };

  const toast = useToast();

  const copyToClipBoard = () => {
    if (!password) return;

    navigator.clipboard.writeText(password);

    toast({
      title: "Copiado!",
      description: "Dados copiados para área de transferência.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <MainContainer>
      <Box display="flex" my="3rem" w="100%" flexDirection="column">
        <Box display="flex" gap={3} padding={3} flexDirection="column">
          <Box display="flex" margin="auto" gap={3} width="100%">
            <Input
              value={password}
              defaultValue=" "
              placeholder="Senha"
              variant="outlined"
              onClick={copyToClipBoard}
            />
            <Button onClick={generatePassword}>Gerar</Button>
          </Box>
          <Accordion>
            <AccordionItem>
              <AccordionButton aria-controls="panel1-content">
                <Text>Opções</Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  py={3}
                  gap={6}
                  flexWrap="wrap"
                >
                  <FormControl maxW="fit-content">
                    <Box display="flex" flexDirection="column" gap={6}>
                      <Box display="flex" gap={1} flexDir="column">
                        <FormLabel id="demo-radio-buttons-group-label">
                          Tipo
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="secure"
                          name="radio-buttons-group"
                          display="flex"
                          gap={2}
                          colorScheme="none"
                          flexDirection="column"
                          onChange={(e) => setPasswordType(e)}
                        >
                          <Radio value="readable">Legível</Radio>
                          <Radio value="secure">Seguro</Radio>
                        </RadioGroup>
                      </Box>
                      <Checkbox
                        defaultChecked={advancedSettings}
                        colorScheme="none"
                        onChange={(e) => setAdvancedSettings(e.target.checked)}
                      >
                        Avançado
                      </Checkbox>
                    </Box>
                  </FormControl>
                  {advancedSettings && (
                    <Box
                      display="flex"
                      gap={30}
                      maxW="66%"
                      flexWrap="wrap"
                      width={"100%"}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        width="100%"
                        maxWidth="500px"
                      >
                        <Text>Tamanho</Text>
                        <Slider
                          defaultValue={8}
                          min={1}
                          max={96}
                          value={passwordLength}
                          onChange={(value) => setPasswordLength(value)}
                          width={"100%"}
                          colorScheme="teal"
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                          border="10px black"
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
                            label={`${passwordLength} caracteres`}
                          >
                            <SliderThumb />
                          </Tooltip>
                        </Slider>
                      </Box>
                      <FormControl
                        style={{
                          whiteSpace: "nowrap",
                          display: "flex",
                          flexDirection: "column",
                          width: "auto",
                          gap: "1rem",
                        }}
                      >
                        <Text pb={2}>Caracteres</Text>
                        <Box display="flex" flexDirection="column" gap={3}>
                          <Switch
                            checked={enableUpperChar}
                            size="sm"
                            colorScheme="cyan"
                            onChange={(e) =>
                              setEnableUpperChar(e.target.checked)
                            }
                          >
                            Maiúsculos
                          </Switch>
                          <Switch
                            checked={enableLowerChar}
                            colorScheme="cyan"
                            size="sm"
                            onChange={(e) =>
                              setEnableLowerChar(e.target.checked)
                            }
                          >
                            Minúsculos
                          </Switch>
                          <Switch
                            checked={enableSpecialChar}
                            colorScheme="cyan"
                            size="sm"
                            onChange={(e) =>
                              setEnableSpecialChar(e.target.checked)
                            }
                          >
                            Especiais
                          </Switch>
                          <Switch
                            checked={enableNumberChar}
                            colorScheme="cyan"
                            size="sm"
                            onChange={(e) =>
                              setEnableNumberChar(e.target.checked)
                            }
                          >
                            Numéricos
                          </Switch>
                        </Box>
                      </FormControl>
                    </Box>
                  )}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </MainContainer>
  );
};
