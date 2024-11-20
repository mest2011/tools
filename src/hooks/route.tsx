/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useCallback } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import ReactGA from "react-ga4";

function useRouteState() {
  const [currentRoute, setCurrentRoute] = useState<string>(
    window.location.pathname
  );

  const getFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  };

  const updateRoute = useCallback((newRoute: string) => {
    async () =>
      ReactGA.send({
        hitType: "pageview",
        page: `/${newRoute}`,
        title: "Tools",
        fingerPrint: await getFingerprint(),
      });
    setCurrentRoute(newRoute);
    window.history.pushState({}, "", newRoute); // Atualiza a URL sem recarregar
  }, []);

  return { currentRoute, updateRoute };
}

export default useRouteState;
