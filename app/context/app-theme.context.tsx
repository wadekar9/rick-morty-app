import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { AppThemeContextProps } from '$types/common.types';
import { IBaseTheme, ITheme } from '$types/theme.types';

export const AppThemeContext = createContext<AppThemeContextProps | undefined>(undefined);

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<ITheme>(Appearance.getColorScheme() || 'light');
    const [systemTheme, setSystemTheme] = useState<ITheme>(Appearance.getColorScheme() || 'light');
    const [selectedTheme, setSelectedTheme] = useState<IBaseTheme>('default');

    const applyTheme = useCallback((newTheme: IBaseTheme) => {
        setSelectedTheme(newTheme);
        setTheme(newTheme === 'default' ? systemTheme : newTheme);
    }, [systemTheme]);

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setSystemTheme(colorScheme as ITheme)
            if (selectedTheme == 'default') {
                setTheme(colorScheme || 'light');
            }
        });
        return () => listener.remove();
    }, [selectedTheme]);

    const contextValue = useMemo(
        () => ({
            theme,
            selectedTheme,
            changeTheme: applyTheme,
        }),
        [selectedTheme, theme, applyTheme]
    );

    return (
        <AppThemeContext.Provider value={contextValue}>
            {children}
        </AppThemeContext.Provider>
    );
};

export default AppThemeProvider;
