import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { ITheme } from '$types/theme.types'
import { COLORS } from '$constants/colors.constants';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { BaseImage, ThemeText } from '$components/ui';
import StatusBadge from './status-badge.component';
import { appStackNavigationRef } from '$utils/navigation';
import { EStackScreens } from '$constants/screen.constants';

interface CharacterProps {
    theme: ITheme;
}

const Character: React.FC<CharacterProps> = ({ theme }) => {

    const styles = styling(theme);

    return (
        <Pressable
            style={styles.container}
            onPress={() => appStackNavigationRef.current?.navigate(EStackScreens.CHARACTER_DETAIL, { id: 1 })}
        >
            <View style={styles.image}>
                <BaseImage
                    source={{ uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' }}
                    resizeMode="cover"
                    wrapperStyle={{ width: '90%', aspectRatio: 1, borderRadius: moderateScale(8), overflow: 'hidden' }}
                />
            </View>
            <View style={styles.content}>
                <ThemeText variant='h4' ellipsizeMode='tail'>Rick Sanchez</ThemeText>
                <StatusBadge theme={theme} status='Alive' />
                <ThemeText style={styles.specieText}>Species: {'Human'}</ThemeText>
                <ThemeText style={styles.locationText}>Location: {'Citadel of Ricks'}</ThemeText>
            </View>
        </Pressable>
    )
}

export default React.memo(Character);

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        width: '100%',
        height: moderateScale(125),
        backgroundColor: COLORS[theme]['surface-alt'],
        borderWidth: moderateScale(1.5),
        borderColor: COLORS[theme].border,
        borderRadius: moderateScale(8),
        padding: moderateScale(10),
        gap: moderateScale(10),
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: moderateScale(100),
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        gap: moderateScale(8)
    },
    specieText: {
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.SM,
        color: COLORS[theme]['icon-default']
    },
    locationText: {
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.SM,
        color: COLORS[theme]['text-secondary']
    },
});
