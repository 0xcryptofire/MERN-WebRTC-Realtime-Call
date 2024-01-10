import { useCallback, useEffect, useRef, useState } from "react";

export const useStateWithCllaback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef();
  const updateState = useCallback((newSate, cb) => {
    cbRef.current = cb;

    setState((prev) => {
      return typeof newSate === "function" ? newSate(prev) : newSate; // so that it support both value and function on setState
    });
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, updateState];
};
