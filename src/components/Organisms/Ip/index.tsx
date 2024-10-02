/* eslint-disable react-hooks/exhaustive-deps */
import axiosBase from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  GridItem,
  Link,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../../Atoms/Button";
import { ContentContainer } from "../../Molecules/ContentContainer";
import { Input } from "../../Atoms/Input";

export const Ip: React.FC = () => {
  const [ip, setIp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const url_api = "https://mesttech.com.br/ip/api/?json=true;";

  const toast = useToast();

  const axios = axiosBase.create();
  axios.defaults.timeout = 800;
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  useEffect(() => {
    axios
      .get(url_api)
      .then(function (response) {
        setIp(response?.data?.ip);
        setLoading(true);
      })
      .catch(() => {
        toast({
          title: "Problema ao obter o seu IP!",
          description:
            "Recarregue a página, caso o problema persista, tente mais tarde.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(ip);

    toast({
      title: "Copiado!",
      description: "Dados copiados para área de transferência.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <ContentContainer title="Qual meu IP?">
        <Box display="flex" gap={16} padding={3} flexDirection="column">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Input
                value={ip}
                placeholder="IP"
                borderColor={"teal"}
                isReadOnly
              />
            </GridItem>
            <GridItem>
              {loading ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                <>
                  <Button onClick={copyToClipBoard} w={"100%"}>
                    Copiar IP
                  </Button>
                </>
              )}
            </GridItem>
          </SimpleGrid>
          <Box display="flex">
            <Link
              href={url_api}
              target="_blank"
              m="auto"
              style={{ textDecoration: "none" }}
            >
              <Button
                px={"5dvw"}
                py={"0.5rem"}
                whiteSpace="wrap"
                height={"auto"}
              >
                Use tambem nossa API de IP
              </Button>
            </Link>
          </Box>
        </Box>
      </ContentContainer>
    </>
  );
};
