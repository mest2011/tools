/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import ReactGA from "react-ga4";
import { Menu, pageList } from "./components/Molecules/Menu";
import { DateComponent } from "./components/Organisms/Date";
import { Ip } from "./components/Organisms/Ip";
import { PasswordGenerator } from "./components/Organisms/PasswordGenerator";
import { TextTransformer } from "./components/Organisms/TextTransformer";
import { MainContainer } from "./components/Atoms/MainContainer";

export const App: React.FC = () => {
  const [page, setPage] = useState<string>("password");

  useEffect(() => {
    checkUrl();
  }, []);

  const checkUrl = () => {
    const url = window.location.hash;
    const hashPage = url.replace("#", "");

    if (pageList.includes(hashPage)) {
      setPage(hashPage);
    }
  };

  const getFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  };

  useEffect(() => {
    async () =>
      ReactGA._gaCommandSendPageview(location.pathname, {
        fingerPrint: await getFingerprint(),
      }); 
  }, [page]);

  return (
    <MainContainer display="flex" flexDir={"column"}>
      <Menu
        my={{ base: 2, md: 4, lg: 6 }}
        changePage={(value) => {
          setPage(value);
        }}
      />
      {page === "password" && <PasswordGenerator />}
      {page === "text" && <TextTransformer />}
      {page === "ip" && <Ip />}
      {page === "date" && <DateComponent />}
    </MainContainer>
  );
};
