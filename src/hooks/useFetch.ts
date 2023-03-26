import { useEffect, useReducer } from 'react';

enum Status {
  LOADING,
  FETCHED,
  ERROR
}

type State<T> = {
  isLoading: Boolean;
  error: null | { status: number; message: string };
  data: null | T;
};

type Action<T> =
  | { type: Status.LOADING }
  | { type: Status.FETCHED; results: null | T }
  | { type: Status.ERROR; error: null | { status: number; message: string } };

/**
 * Custom hook for fetching data.
 * @param url The url for the request.
 * @returns isLoading, error and data.
 */
const useFetch = <T>(url: string): State<T> => {
  const initialState: State<T> = {
    isLoading: true,
    error: null,
    data: null
  };

  const [state, dispatch] = useReducer(
    (state: State<T>, action: Action<T>): State<T> => {
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
        if (!response.ok) {
          dispatch({ type: Status.ERROR, error: data.error });
          return;
        }
        if (cancelRequest) return;
        dispatch({ type: Status.FETCHED, results: data });
      } catch (error) {
        if (cancelRequest) return;
        dispatch({
          type: Status.ERROR,
          error: { status: 500, message: 'Internal Server Error' }
        });
      }
    })();

    // Ensure the hook does not try to update state after is has been unmounted.
    return () => {
      cancelRequest = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { ...state };
};

export default useFetch;
