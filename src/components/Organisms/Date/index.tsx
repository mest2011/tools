import {
  Box,
  FormControl,
  GridItem,
  RadioGroup,
  SimpleGrid,
  useToast,
  Text,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import businessDays from "dayjs-business-days2";
import { useEffect, useState } from "react";
import { Input } from "../../Atoms/Input";
import { ContentContainer } from "../../Molecules/ContentContainer";
import { Radio } from "../../Atoms/Radio";
import { Checkbox } from "../../Atoms/Checkbox";

const holidays = [
  "2024-01-01",
  "2024-02-12",
  "2024-02-13",
  "2024-03-29",
  "2024-04-21",
  "2024-05-01",
  "2024-06-20",
  "2024-09-07",
  "2024-10-12",
  "2024-11-02",
  "2024-11-15",
  "2024-12-25",
  "2025-01-01",
  "2025-03-03",
  "2025-03-04",
  "2025-04-18",
  "2025-04-21",
  "2025-05-01",
  "2025-06-19",
  "2025-09-07",
  "2025-10-12",
  "2025-11-02",
  "2025-11-15",
  "2025-11-20",
  "2025-12-25",
];

const options = {
  holidays: holidays,
  holidayFormat: "YYYY-MM-DD",
};

dayjs.extend(businessDays, options);

export const DateComponent: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [dateSecondary, setDateSecondary] = useState<dayjs.Dayjs | null>(dayjs(new Date()));
  const [input, setInput] = useState<number>(0);
  const toast = useToast();

  const [resultDate, setResultDate] = useState<dayjs.Dayjs | null>(null);
  const [resultDiff, setResultDiff] = useState<number | null>(null);

  const [magnitude, setMagnitude] = useState("day");
  const [type, setType] = useState("sum");
  const [onlyBusinessDay, setOnlyBusinessDay] = useState(false);

  useEffect(() => {
    const dateValue = dayjs(date);
    setResultDiff(null);
    setResultDate(null);

    switch (type) {
      case "sum":
        if (!input) return;
        if (onlyBusinessDay) {
          setResultDate(dateValue.businessDaysAdd(input));
        } else {
          setResultDate(
            dateValue.add(input, magnitude as dayjs.ManipulateType)
          );
        }
        break;
      case "subtract":
        if (!input) return;
        if (onlyBusinessDay) {
          setResultDate(dateValue.businessDaysSubtract(input));
        } else {
          setResultDate(
            dateValue.subtract(input, magnitude as dayjs.ManipulateType)
          );
        }
        break;
      case "difference":
        if (!dateSecondary) return;
        if (onlyBusinessDay) {
          setResultDiff(dateSecondary.businessDiff(dateValue));
        } else {
          setResultDiff(
            dateSecondary.diff(dateValue, magnitude as dayjs.ManipulateType)
          );
        }
    }
  }, [input, date, dateSecondary, magnitude, type, onlyBusinessDay]);

  useEffect(() => {
    setOnlyBusinessDay(false);
  }, [type]);

  const copyToClipBoard = (value = "") => {
    if (!value) return;

    navigator.clipboard.writeText(value);
    toast({
      title: "Copiado!",
      description: "Dados copiados para área de transferência.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <ContentContainer title="Manipulador de data">
      <Box display="flex" flexDirection="column">
        <Box display="flex" gap={3} padding={3} flexDirection="column">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={9}>
            <GridItem display="flex" flexDirection="column" gap={6}>
              <InputGroup size={{ base: "sm", md: "md", lg: "lg" }}>
                <InputLeftAddon
                  bgColor={"teal.700"}
                  border={"none"}
                  color={"whiteAlpha.900"}
                  mr={"-6px"}
                >
                  {type === "difference" ? "Data principal" : "Insira a data"}
                </InputLeftAddon>
                <Input
                  type="date"
                  value={date?.toISOString().split("T")[0]}
                  variant="outlined"
                  onChange={(e) => setDate(new Date(e.target.value))}
                />
              </InputGroup>
              {type === "difference" && (
                <InputGroup size={{ base: "sm", md: "md", lg: "lg" }}>
                  <InputLeftAddon
                    bgColor={"teal.700"}
                    border={"none"}
                    color={"whiteAlpha.900"}
                    mr={"-6px"}
                  >
                    Data secundária
                  </InputLeftAddon>
                  <Input
                    type="date"
                    value={dateSecondary?.toISOString().split("T")[0]}
                    variant="outlined"
                    onChange={(e) => setDateSecondary(dayjs(e.target.value))}
                  />
                </InputGroup>
              )}
              {["sum", "subtract"].includes(type) && (
                <Input
                  value={input}
                  size={{ base: "sm", md: "md", lg: "lg" }}
                  placeholder="Insira o valor"
                  variant="outlined"
                  type="number"
                  style={{ width: "100%" }}
                  onChange={(e) => setInput(Number(e.target.value))}
                />
              )}
              {resultDate !== null ? (
                <Box
                  onClick={() =>
                    copyToClipBoard(resultDate.format("DD/MM/YYYY"))
                  }
                >
                  <InputGroup size={{ base: "sm", md: "md", lg: "lg" }}>
                    <InputLeftAddon
                      bgColor={"teal.700"}
                      border={"none"}
                      color={"whiteAlpha.900"}
                      mr={"-6px"}
                    >
                      Resultado
                    </InputLeftAddon>
                    <Input
                      type="date"
                      value={resultDate?.toISOString().split("T")[0]}
                      variant="outlined"
                      onChange={(e) => setDate(new Date(e.target.value))}
                    />
                  </InputGroup>
                </Box>
              ) : (
                <></>
              )}
              {resultDiff !== null ? (
                <Input
                  value={resultDiff}
                  placeholder="Resultado"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onClick={() => copyToClipBoard(resultDiff.toString())}
                  isReadOnly
                />
              ) : (
                <></>
              )}
            </GridItem>
            <GridItem gap={2} display="flex" flexDirection="column">
              <FormControl>
                <Box display="flex" flexDirection="column" gap={2}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="sum"
                    name="radio-buttons-group"
                    display="flex"
                    gap={3}
                    flexWrap="wrap"
                    colorScheme="teal"
                    color="white"
                    onChange={(e) => setType(e)}
                  >
                    <Radio value="sum">Somar</Radio>
                    <Radio value="subtract">Subtrair</Radio>
                    <Radio value="difference">Diferença</Radio>
                  </RadioGroup>
                </Box>
              </FormControl>
              {!onlyBusinessDay && (
                <FormControl>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <RadioGroup
                      aria-labelledby="magnitude-radio-buttons-group-label"
                      name="magnitude-radio-buttons-group"
                      defaultValue="day"
                      display="flex"
                      gap={3}
                      flexWrap="wrap"
                      colorScheme="teal"
                      color="white"
                      onChange={(e) => setMagnitude(e)}
                    >
                      <Radio value="day">Dias</Radio>
                      <Radio value="month">Meses</Radio>
                      <Radio value="year">Anos</Radio>
                    </RadioGroup>
                  </Box>
                </FormControl>
              )}
              <FormControl display={"flex"} gap={2} flexDir={"column"}>
                <Checkbox
                  onChange={(e) => setOnlyBusinessDay(e.target.checked)}
                  colorScheme="none"
                  color={"white"}
                  checked={onlyBusinessDay}
                >
                  Apenas dias úteis*
                </Checkbox>
                <Text fontSize="8px" color={"white"}>
                  *Função beta, pode apresentar inconsistências
                </Text>
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </ContentContainer>
  );
};
