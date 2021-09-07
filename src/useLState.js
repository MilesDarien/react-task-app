import { useEffect } from "react";

export default function useLState(currentState, setState, key) {
  const LOCAL_STORAGE_KEY = key;
  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedState) setState(storedState);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
  }, [currentState]);
}
