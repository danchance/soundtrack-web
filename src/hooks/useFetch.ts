import { useEffect, useReducer, useRef } from 'react';
import useAccessToken from './useAccessToken';

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
 * @param accessTokenReq Set to true if the request requires an access token.
 * @returns isLoading, error, data and the request function.
 */
const useFetch = <T>(url: string, accessTokenReq = false) => {
  const cancelRequest = useRef(false);
  const initialState: State<T> = {
    isLoading: true,
    error: null,
    data: null
  };
  const { accessToken } = useAccessToken();

  const [state, dispatch] = useReducer(
    (state: State<T>, action: Action<T>): State<T> => {
      switch (action.type) {
        case Status.LOADING:
          return { ...state, isLoading: true };
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

  /**
   * Fetches data from the provided url.
   * This function only needs to be called from outside this hook if the
   * same request (unchanged url) needs to be made again.
   */
  const request = async (accessToken: string) => {
    cancelRequest.current = false;
    if (!url) return;
    if (accessTokenReq && !accessToken) return;
    console.log('requesting');
    try {
      dispatch({ type: Status.LOADING });
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch({ type: Status.ERROR, error: data.error });
        return;
      }
      if (cancelRequest.current) return;
      dispatch({ type: Status.FETCHED, results: data });
    } catch (error) {
      if (cancelRequest.current) return;
      dispatch({
        type: Status.ERROR,
        error: { status: 500, message: 'Internal Server Error' }
      });
    }
  };

  /**
   * Fetches data when the url changes or access token changes.
   * Used when an access token is required for the request.
   */
  useEffect(() => {
    if (!accessTokenReq) return;
    request(accessToken);

    // Ensure the hook does not try to update state after is has been
    // unmounted.
    return () => {
      cancelRequest.current = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, accessToken]);

  /**
   * Fetches data when the url changes.
   * Used when an access token is not required for the request.
   */
  useEffect(() => {
    request(accessToken);

    // Ensure the hook does not try to update state after is has been
    // unmounted.
    return () => {
      cancelRequest.current = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { ...state, request };
};

export default useFetch;
