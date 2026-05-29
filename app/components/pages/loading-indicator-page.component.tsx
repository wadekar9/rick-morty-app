import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS } from '$constants/colors.constants'
import { useAppTheme } from '$hooks/common'

const LoadingIndicatorPage = () => {

    const { theme } = useAppTheme();

    return (
        <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
            <ActivityIndicator size={'large'} color={COLORS[theme]['brand-primary']} />
        </View>
    )
}

export default React.memo(LoadingIndicatorPage);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
})