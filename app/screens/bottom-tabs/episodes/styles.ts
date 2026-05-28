import { COLORS } from '$constants/colors.constants';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { ITheme } from '$types/theme.types';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const styling = (theme: ITheme, insets: EdgeInsets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS[theme].background,
    },
    contentContainer: {
        flexGrow: 1,
        padding: moderateScale(16),
        paddingBottom: insets.bottom + moderateScale(100),
        gap: moderateScale(12)
    },
    sectionHeader: {
        fontSize: EFontSize.XL,
        fontFamily: EFonts.BOLD,
        color: COLORS[theme]["text-primary"],
        paddingVertical: moderateScale(8),
        backgroundColor: COLORS[theme].background,
    }
});
