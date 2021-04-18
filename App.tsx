import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {HomeScreen} from './src/HomeScreen';

declare global {
  namespace ReactNativePaper {
    interface Theme {
      spacing: {
        s: number;
        m: number;
        l: number;
        xl: number;
      };
    }
  }
}

export const theme = {
  ...DefaultTheme,
  spacing: {
    s: 4,
    m: 8,
    l: 16,
    xl: 32,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <HomeScreen />
    </PaperProvider>
  );
};

export default App;
