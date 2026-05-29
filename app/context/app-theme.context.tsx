import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { AppThemeContextProps } from '$types/common.types';
import { ITheme } from '$types/theme.types';

export const AppThemeContext = createContext<AppThemeContextProps | undefined>(undefined);

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<ITheme>(Appearance.getColorScheme() || 'light');

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme || 'light');
        });
        return () => listener.remove();
    }, []);

    const contextValue = useMemo(() => ({ theme, changeTheme: setTheme }), [theme]);

    return (
        <AppThemeContext.Provider value={contextValue}>
            {children}
        </AppThemeContext.Provider>
    );
};

export default AppThemeProvider;
