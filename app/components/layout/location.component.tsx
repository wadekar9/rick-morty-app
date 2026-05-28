import React, { useState } from "react";
import { BaseImage, ThemeText } from "$components/ui";
import { EFonts, EFontSize, moderateScale } from "$constants/styles.constants";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { ITheme } from "$types/theme.types";
import { ILocation } from "$types/data.types";
import { COLORS } from "$constants/colors.constants";

interface LocationProps {
    theme: ITheme;
    location: ILocation;
}

const Location: React.FC<LocationProps> = ({ location, theme }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const styles = styling(theme);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                activeOpacity={0.7}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <View style={styles.content}>
                    <ThemeText style={styles.locationName}>{location.name}</ThemeText>
                    <ThemeText style={styles.locationType}>{location.type}</ThemeText>
                    <ThemeText style={styles.locationDimension}>{location.dimension}</ThemeText>
                </View>
                {isExpanded ? (
                    <ChevronUp color={COLORS[theme]['icon-default']} size={moderateScale(24)} />
                ) : (
                    <ChevronDown color={COLORS[theme]['icon-default']} size={moderateScale(24)} />
                )}
            </TouchableOpacity>

            {isExpanded && location.residents && location.residents.length > 0 && (
                <View style={styles.avatarsContainer}>
                    {location.residents.map((charUrl: string, idx: number) => {
                        const charId = charUrl.split('/').pop();
                        return (
                            <BaseImage
                                key={`${charId}-${idx}`}
                                source={{ uri: `https://rickandmortyapi.com/api/character/avatar/${charId}.jpeg` }}
                                wrapperStyle={styles.avatarWrapper}
                            />
                        );
                    })}
                </View>
            )}
        </View>
    );
};

export default React.memo(Location);

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        backgroundColor: COLORS[theme]['surface-alt'],
        borderRadius: moderateScale(8),
        borderWidth: moderateScale(1),
        borderColor: COLORS[theme].border,
        overflow: 'hidden'
    },
    header: {
        padding: moderateScale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        gap: moderateScale(4)
    },
    locationName: {
        fontSize: EFontSize.LG,
        fontFamily: EFonts.SEMI_BOLD,
        color: COLORS[theme]["text-primary"]
    },
    locationType: {
        fontSize: EFontSize.LG,
        fontFamily: EFonts.MEDIUM,
        color: COLORS[theme]["text-secondary"]
    },
    locationDimension: {
        fontSize: EFontSize.SM,
        fontFamily: EFonts.REGULAR,
        color: COLORS[theme]["text-secondary"]
    },
    avatarsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: moderateScale(16),
        paddingTop: 0,
        gap: moderateScale(8)
    },
    avatarWrapper: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        overflow: 'hidden',
        backgroundColor: COLORS[theme].border
    }
});