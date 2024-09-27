import { Route, Routes as RoutesDom } from "react-router-dom";
import { PasswordGenerator } from "./components/Organisms/PasswordGenerator";

export const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/password" element={<PasswordGenerator />}/>
    </RoutesDom>
  );
};
