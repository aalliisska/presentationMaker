import { useEffect, RefObject } from 'react';

// Define the type for the handler function
type Handler = (event: MouseEvent) => void;

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: Handler) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // Check if the ref is defined and if the click is outside of it
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    // Add event listener for mousedown
    document.addEventListener('mousedown', listener);
    
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]); // Dependencies array
};

export default useOnClickOutside;