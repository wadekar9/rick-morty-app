import { StyleSheet, View, ViewProps } from 'react-native'
import React from 'react'
import { useAppTheme, useSafeAreaInsetsStyle } from '$hooks/common';
import { ITheme } from '$types/theme.types';;
import { COLORS } from '$constants/colors.constants';

interface ThemedViewProps extends ViewProps {
    children: React.ReactNode;
    theme?: ITheme;
}

const ThemedView: React.FC<ThemedViewProps> = ({ children, theme, style, ...props }) => {
    const { theme: appTheme } = useAppTheme();
    const { paddingTop } = useSafeAreaInsetsStyle(['top']);

    const activeTheme = theme || appTheme;
    const colors = COLORS[activeTheme];

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors['brand-primary'], paddingTop },
                style
            ]}
            {...props}
        >
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {children}
            </View>
        </View>
    )
}

export default ThemedView;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})