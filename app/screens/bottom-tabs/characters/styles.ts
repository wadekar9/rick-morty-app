import { COLORS } from '$constants/colors.constants';
import { moderateScale } from '$constants/styles.constants';
import { ITheme } from '$types/theme.types';;
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const styling = (theme: ITheme, insets: EdgeInsets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS[theme].background,
    },
    contentContainer: {
        flexGrow: 1,
        padding: moderateScale(20),
        paddingBottom: moderateScale(100) + insets.bottom,
        gap: moderateScale(12),
    }
});
