import { COLORS } from "$constants/colors.constants";
import { DEVICE_WIDTH, EFonts, EFontSize, moderateScale } from "$constants/styles.constants";
import { ITheme } from "$types/theme.types";
import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

export const styling = (theme: ITheme, insets: EdgeInsets) => StyleSheet.create({
    image: {
        width: DEVICE_WIDTH,
        height: undefined,
        aspectRatio: 1.25,
        borderBottomRightRadius: moderateScale(20),
        borderBottomLeftRadius: moderateScale(20),
        overflow: 'hidden'
    },
    contentContainer: {
        flexGrow: 1
    },
    content: {
        padding: moderateScale(16),
        paddingBottom: insets.bottom + moderateScale(16),
        gap: moderateScale(10),
    },
    title: {
        fontSize: EFontSize["3XL"] - 2,
        fontFamily: EFonts.SEMI_BOLD,
        color: COLORS[theme]["text-primary"]
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
        flexWrap: 'wrap',
        width: '100%'
    },
    keyLabel: {
        fontSize: EFontSize.XL,
        fontFamily: EFonts.MEDIUM,
        color: COLORS[theme]["text-primary"]
    },
    keyValue: {
        fontSize: EFontSize.XL,
        fontFamily: EFonts.REGULAR,
        color: COLORS[theme]["text-secondary"],
        letterSpacing: 0.15
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: moderateScale(16),
        gap: moderateScale(10),
        width: '100%',
        position: 'absolute',
        top: 0
    },
    headerAction: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(50),
        backgroundColor: COLORS[theme]["surface-alt"],
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusWrapper: {
        position: 'absolute',
        bottom: moderateScale(16),
        right: moderateScale(16)
    },
    section: {
        gap: moderateScale(16),
        paddingVertical: moderateScale(10)
    },
    episodes: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(10)
    },
    episode: {
        width: (DEVICE_WIDTH - moderateScale(55)) / 3,
        height: moderateScale(50),
        borderRadius: moderateScale(4),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS[theme].border
    }
});
