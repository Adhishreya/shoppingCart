import { useEffect, useState } from "react";

export const useResponsive = (breakpoint, maxWidth = 600) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (breakpoint <= maxWidth) setIsMobile(true);
    else setIsMobile(false);
  }, [breakpoint]);
  return isMobile;
};
