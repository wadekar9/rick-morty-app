import { COLORS } from '$constants/colors.constants';
import { AppThemeContext } from '$context/app-theme.context';
import { useContext, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Hook to access the current application theme context.
 * Provides theme mode (light/dark), color tokens, and safe area insets.
 * @returns Theme context including colors and insets.
 */
export const useAppTheme = () => {
    const context = useContext(AppThemeContext);
    const insets = useSafeAreaInsets();

    if (!context) {
        throw new Error('useAppTheme must be used within an AppThemeProvider');
    }

    const { changeTheme, theme, selectedTheme } = context;

    return useMemo(() => ({
        changeTheme,
        theme,
        selectedTheme,
        colors: COLORS[theme],
        insets,
    }), [changeTheme, theme, selectedTheme, insets]);
};
