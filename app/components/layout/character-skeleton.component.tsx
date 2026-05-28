import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ITheme } from '$types/theme.types'
import { COLORS } from '$constants/colors.constants';
import { moderateScale } from '$constants/styles.constants';
import { BaseSkeleton } from '$components/ui';

interface CharacterSkeletonProps {
    theme: ITheme;
}

const CharacterSkeleton: React.FC<CharacterSkeletonProps> = ({ theme }) => {
    const styles = styling(theme);

    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <BaseSkeleton style={styles.imageWrapper} borderRadius={moderateScale(8)} />
            </View>
            <View style={styles.content}>
                <BaseSkeleton width="70%" height={moderateScale(20)} borderRadius={moderateScale(4)} />
                <BaseSkeleton width="30%" height={moderateScale(24)} borderRadius={moderateScale(100)} />
                <BaseSkeleton width="50%" height={moderateScale(14)} borderRadius={moderateScale(4)} />
                <BaseSkeleton width="80%" height={moderateScale(14)} borderRadius={moderateScale(4)} />
            </View>
        </View>
    )
}

export default React.memo(CharacterSkeleton);

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
    imageWrapper: {
        width: '90%',
        aspectRatio: 1,
    }
});
