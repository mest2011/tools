/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useCallback, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import ReactGA from "react-ga4";
import { pageList } from "../components/Molecules/Menu";

function useRouteState() {
  const [currentRoute, setCurrentRoute] = useState<string>(
    window.location.pathname
  );

  const checkUrl = () => {
    const url = window.location.hash;
    const hashPage = url.replace("#", "");

    if (pageList.includes(hashPage)) {
      setCurrentRoute(hashPage);
    }
  };

  useEffect(() => {
    checkUrl();
  }, []);

  const getFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  };

  const updateRoute = useCallback((newRoute: string) => {
    async () =>
      ReactGA.send({
        hitType: "pageview",
        page: `/#${newRoute}`,
        title: "Tools",
        fingerPrint: await getFingerprint(),
      });
    setCurrentRoute(newRoute);
    window.history.pushState({}, "", `#${newRoute}`); // Atualiza a URL sem recarregar
  }, []);

  return { currentRoute, updateRoute };
}

export default useRouteState;
