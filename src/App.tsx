import { Menu } from "./components/Molecules/Menu";
import { DateComponent } from "./components/Organisms/Date";
import { Ip } from "./components/Organisms/Ip";
import { PasswordGenerator } from "./components/Organisms/PasswordGenerator";
import { TextTransformer } from "./components/Organisms/TextTransformer";
import { MainContainer } from "./components/Atoms/MainContainer";
import { useRouteContext } from "./providers/router";
import { Clock } from "./components/Organisms/Clock";
import { News } from "./components/Organisms/News";

export const App: React.FC = () => {
  const { currentRoute } = useRouteContext();

  return (
    <MainContainer display="flex" flexDir={"column"}>
      <Menu my={{ base: 2, md: 4, lg: 6 }} />
      {["password", "/"].includes(currentRoute) && <PasswordGenerator />}
      {currentRoute === "text" && <TextTransformer />}
      {currentRoute === "ip" && <Ip />}
      {currentRoute === "date" && <DateComponent />}
      {currentRoute === "clock" && <Clock />}
      {currentRoute === "news" && <News />}
    </MainContainer>
  );
};
