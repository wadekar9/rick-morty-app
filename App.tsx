import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppThemeProvider from '$context/app-theme.context';
import { Provider as StoreProvider } from 'react-redux';
import store from '$store/redux.store';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStackNavigator from '$navigation/app-stack-navigator.navigation';

const App = () => {
  return (
    <AppThemeProvider>
      <StoreProvider store={store}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppStackNavigator />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </StoreProvider>

      <FlashMessage position="top" />
    </AppThemeProvider>
  );
};

export default App;
