import { EFonts, moderateScale } from '$constants/styles.constants';
import { Platform, StatusBar } from 'react-native';
import { MessageOptions, showMessage } from 'react-native-flash-message';
import { COLORS } from '$constants/colors.constants';

export function showFlashMessage(props: MessageOptions) {

    showMessage({
        ...props,
        animated: true,
        duration: 5000,
        position: 'top',
        hideOnPress: true,
        textStyle: {
            fontFamily: EFonts.MEDIUM,
            fontSize: moderateScale(14),
            color: COLORS.light['surface'],
            letterSpacing: 0.5,
        },
        titleStyle: {
            fontFamily: EFonts.SEMI_BOLD,
            fontSize: moderateScale(15),
            color: COLORS.light['surface'],
            letterSpacing: 0.5,
        },
        titleProps: { numberOfLines: 3 },
        textProps: { numberOfLines: 3 },
        statusBarHeight: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : undefined,
    });
}
