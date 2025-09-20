import React, { createContext, useState, useMemo, useEffect } from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DefaultTheme as NavLight, DarkTheme as NavDark } from '@react-navigation/native';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState('light');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('@theme');
      if (saved) setThemeName(saved);
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newTheme);
    await AsyncStorage.setItem('@theme', newTheme);
  };

  const paperTheme = themeName === 'light' ? MD3LightTheme : MD3DarkTheme;
  const navTheme = themeName === 'light' ? NavLight : NavDark;

  const contextValue = useMemo(() => ({ themeName, toggleTheme }), [themeName]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navTheme}>
          {children}
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
