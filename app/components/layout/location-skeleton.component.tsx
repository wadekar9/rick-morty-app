import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ITheme } from '$types/theme.types'
import { COLORS } from '$constants/colors.constants';
import { moderateScale } from '$constants/styles.constants';
import { BaseSkeleton } from '$components/ui';

interface LocationSkeletonProps {
    theme: ITheme;
}

const LocationSkeleton: React.FC<LocationSkeletonProps> = ({ theme }) => {
    const styles = styling(theme);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BaseSkeleton width="60%" height={moderateScale(20)} borderRadius={moderateScale(4)} />
                <BaseSkeleton width="20%" height={moderateScale(24)} borderRadius={moderateScale(100)} />
            </View>
            <View style={styles.content}>
                <BaseSkeleton width="40%" height={moderateScale(14)} borderRadius={moderateScale(4)} />
                <BaseSkeleton width="30%" height={moderateScale(14)} borderRadius={moderateScale(4)} />
            </View>
        </View>
    )
}

export default React.memo(LocationSkeleton);

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        width: '100%',
        padding: moderateScale(16),
        backgroundColor: COLORS[theme]['surface-alt'],
        borderWidth: moderateScale(1.5),
        borderColor: COLORS[theme].border,
        borderRadius: moderateScale(8),
        gap: moderateScale(12),
        overflow: 'hidden'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: moderateScale(12)
    },
    content: {
        gap: moderateScale(8)
    }
});
