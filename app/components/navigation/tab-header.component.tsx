import { Animated, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale } from '$constants/styles.constants'
import { COLORS } from '$constants/colors.constants'
import { ITheme } from '$types/theme.types'
import { BaseSearchBar, ThemeText } from '$components/ui'

interface TabHeaderProps {
    theme: ITheme;
    headerText?: string;
    hasSearchBar?: boolean;
}

const TabHeader: React.FC<TabHeaderProps> = ({ theme, headerText = 'HeaderText', hasSearchBar = false }) => {

    const styles = styling(theme);

    return (
        <Animated.View style={styles.container}>
            <ThemeText>{headerText}</ThemeText>
            {hasSearchBar && <BaseSearchBar placeholder='Search...' />}
        </Animated.View>
    )
}

export default React.memo(TabHeader);

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        minHeight: moderateScale(55),
        padding: moderateScale(15),
        gap: moderateScale(10),
        justifyContent: 'center',
        backgroundColor: COLORS[theme].border,
    }
})
