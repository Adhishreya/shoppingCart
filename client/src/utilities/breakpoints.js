import { useEffect, useState } from "react";

const maxWidth = 600;

export const useResponsive = (breakpoint) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (breakpoint <= maxWidth) setIsMobile(true);
    else setIsMobile(false);
  }, [breakpoint]);
  return isMobile;
};
