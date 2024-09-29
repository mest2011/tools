import { useState } from "react";
import { Menu } from "./components/Molecules/Menu";
import { DateComponent } from "./components/Organisms/Date";
import { Ip } from "./components/Organisms/Ip";
import { PasswordGenerator } from "./components/Organisms/PasswordGenerator";
import { TextTransformer } from "./components/Organisms/TextTransformer";
import { MainContainer } from "./components/Atoms/MainContainer";

export const App: React.FC = () => {
  const [page, setPage] = useState("password");

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
