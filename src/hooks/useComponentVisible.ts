import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook used to track the visibility of a component. Used for modals,
 * dropdowns, etc.
 * Any click outside of the component will set the visibility to false.
 * @returns {object} ref - A ref to the component to be tracked
 * @returns {boolean} isVisible - Whether or not the component is visible
 * @returns {function} setIsVisible - A function to set the visibility of the component
 */
const useComponentVisible = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () =>
      document.removeEventListener('click', handleClickOutside, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, isVisible, setIsVisible };
};

export default useComponentVisible;
