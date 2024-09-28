import { Route, Routes as RoutesDom } from "react-router-dom";
import { PasswordGenerator } from "./components/Organisms/PasswordGenerator";
import { TextTransformer } from "./components/Organisms/TextTransformer";

export const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/password" element={<PasswordGenerator />}/>
      <Route path="/text" element={<TextTransformer />}/>
    </RoutesDom>
  );
};
