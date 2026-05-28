import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppThemeProvider from '$context/app-theme.context';
import { Provider as StoreProvider } from 'react-redux';
import store from '$store/redux.store';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStackNavigator from '$navigation/app-stack-navigator.navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '$utils/query-client';
import { initDB } from '$utils/database';
import { loadFavourites } from '$store/actions/favourite.actions';

const App = () => {

  useEffect(() => {
    const setup = async () => {
      await initDB();
      store.dispatch(loadFavourites());
    };
    setup();
  }, []);

  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <StoreProvider store={store}>
          <SafeAreaProvider style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <AppStackNavigator />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </StoreProvider>
      </QueryClientProvider>

      <FlashMessage position="top" />
    </AppThemeProvider>
  );
};

export default App;
