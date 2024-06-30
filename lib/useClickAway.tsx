import { useEffect, useRef } from "react";

export function useClickAway<E extends HTMLElement>(callback: () => void) {
  const ref = useRef<E>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    //console.log("init clickaway");

    document.addEventListener("mousedown", handleClick);

    return () => {
      //console.log("remove clickaway");
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);

  return ref;
}
