import { Route, Routes as RoutesDom } from "react-router-dom";
import { PasswordGenerator } from "./components/Organisms/PasswordGenerator";
import { TextTransformer } from "./components/Organisms/TextTransformer";
import { Ip } from "./components/Organisms/Ip";
import { DateComponent } from "./components/Organisms/Date";

export const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<PasswordGenerator />} />
      <Route path="/password" element={<PasswordGenerator />} />
      <Route path="/text" element={<TextTransformer />} />
      <Route path="/ip" element={<Ip />} />
      <Route path="/date" element={<DateComponent />} />
    </RoutesDom>
  );
};
