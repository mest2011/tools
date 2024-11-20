import { Menu } from "./components/Molecules/Menu";
import { DateComponent } from "./components/Organisms/Date";
import { Ip } from "./components/Organisms/Ip";
import { PasswordGenerator } from "./components/Organisms/PasswordGenerator";
import { TextTransformer } from "./components/Organisms/TextTransformer";
import { MainContainer } from "./components/Atoms/MainContainer";
import { useEffect } from "react";
import { useRouteContext } from "./providers/router";
import { Clock } from "./components/Organisms/Clock";

export const App: React.FC = () => {
  const { currentRoute } = useRouteContext();

  useEffect(() => {
    console.log("currentRoute", currentRoute);  
  }, [currentRoute]);

  return (
    <MainContainer display="flex" flexDir={"column"}>
      <Menu my={{ base: 2, md: 4, lg: 6 }} />
      {currentRoute === "password" ||
        (currentRoute === null && <PasswordGenerator />)}
      {currentRoute === "text" && <TextTransformer />}
      {currentRoute === "ip" && <Ip />}
      {currentRoute === "date" && <DateComponent />}
      {currentRoute === "clock" && <Clock />}
    </MainContainer>
  );
};
