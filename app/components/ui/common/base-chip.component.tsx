import { StyleSheet, TouchableOpacity } from "react-native"
import { ThemeText } from "../themed";
import { ITheme } from "$types/theme.types";
import { moderateScale, EFontSize, EFonts } from "$constants/styles.constants";
import { COLORS } from "$constants/colors.constants";
import React from "react";

interface BaseChipProps {
    theme: ITheme;
    label: string;
    selected: boolean;
    onPress: () => void;
}

const BaseChip: React.FC<BaseChipProps> = ({
    theme,
    label,
    selected,
    onPress
}) => {

    const styles = styling(theme);

    return (
        <TouchableOpacity
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <ThemeText style={[styles.chipText, selected && styles.chipTextSelected]}>
                {label}
            </ThemeText>
        </TouchableOpacity>
    )
}

export default React.memo(BaseChip);

const styling = (theme: ITheme) => StyleSheet.create({
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(12),
    },
    chip: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(8),
        borderRadius: moderateScale(20),
        borderWidth: moderateScale(1),
        borderColor: COLORS[theme].border,
        backgroundColor: COLORS[theme].background,
    },
    chipSelected: {
        backgroundColor: COLORS[theme]['brand-primary'],
        borderColor: COLORS[theme]['brand-primary'],
    },
    chipText: {
        fontSize: EFontSize.SM,
        fontFamily: EFonts.MEDIUM,
        color: COLORS[theme]['text-secondary'],
        textTransform: 'capitalize'
    },
    chipTextSelected: {
        color: '#FFFFFF',
    },
})
