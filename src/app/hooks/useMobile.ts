import { useEffect, useState } from "react";

function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  return { isMobile };
}

export default useMobile;
