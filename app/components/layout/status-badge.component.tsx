import React from "react";
import { ThemeText } from "$components/ui";
import { ITheme } from "$types/theme.types";
import { StyleSheet, View } from "react-native";
import { EFonts, EFontSize, moderateScale } from "$constants/styles.constants";
import { COLORS } from "$constants/colors.constants";

interface StatusBadgeProps {
    status: 'Alive' | 'Dead' | 'Unknown';
    theme: ITheme;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ theme, status }) => {

    const statusColor = status === 'Alive' ? COLORS[theme]["state-success"] : status === 'Dead' ? COLORS[theme]["state-danger"] : COLORS[theme]["state-warning"];

    return (
        <View style={[styles.container, { borderColor: statusColor }]}>
            <ThemeText style={[styles.statusText, { color: statusColor }]}>{status}</ThemeText>
        </View>
    )
}

export default React.memo(StatusBadge);

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(100),
        borderWidth: moderateScale(1),
        gap: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(2)
    },
    statusText: {
        fontSize: EFontSize.XS,
        fontFamily: EFonts.MEDIUM
    }
});