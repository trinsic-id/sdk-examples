import { useEffect } from "react";

export const useLockBg = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add("lock-bg");
    } else {
      document.body.classList.remove("lock-bg");
    }
  }, [isLocked]);

  return;
};
