import React, { useState } from "react";
import { BaseImage, ThemeText } from "$components/ui";
import { EFonts, EFontSize, moderateScale } from "$constants/styles.constants";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { ITheme } from "$types/theme.types";
import { IEpisode } from "$types/data.types";
import { COLORS } from "$constants/colors.constants";


interface EpisodeProps {
    theme: ITheme;
    episode: IEpisode;
}

const Episode: React.FC<EpisodeProps> = ({ episode, theme }) => {

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
                    <ThemeText style={styles.episodeName}>{episode.name}</ThemeText>
                    <ThemeText style={styles.episodeCode}>{episode.episode}</ThemeText>
                    <ThemeText style={styles.episodeAirDate}>{episode.air_date}</ThemeText>
                </View>
                {isExpanded ? (
                    <ChevronUp color={COLORS[theme]['icon-default']} size={moderateScale(24)} />
                ) : (
                    <ChevronDown color={COLORS[theme]['icon-default']} size={moderateScale(24)} />
                )}
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.avatarsContainer}>
                    {episode.characters.map((charUrl: string, idx: number) => {
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

export default React.memo(Episode);

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
    episodeName: {
        fontSize: EFontSize.LG,
        fontFamily: EFonts.SEMI_BOLD,
        color: COLORS[theme]["text-primary"]
    },
    episodeCode: {
        fontSize: EFontSize.LG,
        fontFamily: EFonts.MEDIUM,
        color: COLORS[theme]["text-secondary"]
    },
    episodeAirDate: {
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
})