import { useEffect, useReducer } from 'react';

enum Status {
  LOADING,
  FETCHED,
  ERROR
}

type State = {
  isLoading: Boolean;
  error: null | string;
  data: any;
};

type Action =
  | { type: Status.LOADING }
  | { type: Status.FETCHED; results: any }
  | { type: Status.ERROR; error: string };

/**
 * Custom hook for fetching data.
 * @param url The url for the request.
 * @returns isLoading, error and data.
 */
const useFetch = (url: string): State => {
  const initialState: State = {
    isLoading: true,
    error: null,
    data: null
  };

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case Status.LOADING:
          return { isLoading: true, error: null, data: null };
        case Status.FETCHED:
          return {
            isLoading: false,
            data: action.results,
            error: null
          };
        case Status.ERROR:
          return { isLoading: false, error: action.error, data: null };
        default:
          return state;
      }
    },
    initialState
  );

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;
    (async () => {
      try {
        dispatch({ type: Status.LOADING });
        const response = await fetch(url);
        const data = await response.json();
        if (cancelRequest) return;
        dispatch({ type: Status.FETCHED, results: data });
      } catch (error) {
        if (cancelRequest) return;
        if (error instanceof Error) {
          dispatch({ type: Status.ERROR, error: error.message });
          return;
        }
        dispatch({ type: Status.ERROR, error: 'Unexpected Error' });
      }
    })();

    // Ensure the hook does not try to update state after is has been unmounted.
    return () => {
      cancelRequest = true;
    };

    const fetchData = async () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { ...state };
};

export default useFetch;
