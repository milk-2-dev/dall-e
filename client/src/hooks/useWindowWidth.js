import { useEffect, useState } from 'react';

export const useCheckWindowSize = () => {
  const [value, setValue] = useState(null);

  const onResize = () => setValue(window.innerWidth);

  useEffect(() => {
    onResize()

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };

    // eslint-disable-next-line
  }, []);

  return value;
}