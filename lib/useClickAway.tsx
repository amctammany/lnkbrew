import { useEffect, useRef } from "react";

export function useClickAway<E extends HTMLElement>(callback: () => void) {
  const ref = useRef<E>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.currentTarget)) {
        callback();
      }
    };
    console.log("init clickaway");

    document.addEventListener("click", handleClick);

    return () => {
      console.log("remove clickaway");
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);

  return ref;
}
