import { StyleSheet, View } from 'react-native'
import React from 'react'
import { moderateScale } from '$constants/styles.constants'
import { COLORS } from '$constants/colors.constants'
import { ITheme } from '$types/theme.types'
import { BaseSearchBar, ThemeText } from '$components/ui'

interface TabHeaderProps {
    theme: ITheme;
    headerText?: string;
    hasSearchBar?: boolean;
    onPressFilter?: () => void;
    onChangeSearch?: (text: string) => void;
}

/**
 * Reusable screen header component for the tab screens.
 * Includes an optional search bar and filter button.
 * 
 * @param props Properties defining the title, search callbacks, and layout.
 */
const TabHeader: React.FC<TabHeaderProps> = ({ theme, headerText = 'HeaderText', hasSearchBar = false, onPressFilter, onChangeSearch }) => {

    const styles = styling(theme);

    return (
        <View style={styles.container}>
            <ThemeText>{headerText}</ThemeText>
            {hasSearchBar && <BaseSearchBar onPressFilter={onPressFilter} onChange={onChangeSearch} placeholder='Search...' />}
        </View>
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
