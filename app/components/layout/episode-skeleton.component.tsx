import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ITheme } from '$types/theme.types'
import { COLORS } from '$constants/colors.constants';
import { moderateScale } from '$constants/styles.constants';
import { BaseSkeleton } from '$components/ui';

interface EpisodeSkeletonProps {
    theme: ITheme;
}

const EpisodeSkeleton: React.FC<EpisodeSkeletonProps> = ({ theme }) => {
    const styles = styling(theme);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.content}>
                    <BaseSkeleton width="70%" height={moderateScale(18)} borderRadius={moderateScale(4)} />
                    <BaseSkeleton width="40%" height={moderateScale(18)} borderRadius={moderateScale(4)} />
                    <BaseSkeleton width="30%" height={moderateScale(14)} borderRadius={moderateScale(4)} />
                </View>
                <BaseSkeleton width={moderateScale(24)} height={moderateScale(24)} borderRadius={moderateScale(12)} />
            </View>
        </View>
    )
}

export default React.memo(EpisodeSkeleton);

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
        gap: moderateScale(8)
    }
});
