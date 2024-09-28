import { MainContainer } from "./components/Atoms/MainContainer";
import { Routes } from "./routes";

export const App: React.FC = () => {
  return (
    <MainContainer>
      <Routes />
    </MainContainer>
  );
};
