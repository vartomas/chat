import { useLocalStorageValue } from '@mantine/hooks';

import { ColorScheme } from '@mantine/core';

export const useApp = () => {
  const [colorMode, setColorMode] = useLocalStorageValue<ColorScheme>({ key: 'color-scheme', defaultValue: 'dark' });

  return {
    colorMode,
    setColorMode,
  };
};
