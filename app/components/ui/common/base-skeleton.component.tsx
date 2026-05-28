import React, { useEffect } from 'react';
import { StyleProp, ViewStyle, StyleSheet, View, DimensionValue } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
} from 'react-native-reanimated';
import { useAppTheme } from '$hooks/common';
import { COLORS } from '$constants/colors.constants';
import { moderateScale } from '$constants/styles.constants';

interface BaseSkeletonProps {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    style?: StyleProp<ViewStyle>;
}

/**
 * Animated skeleton loader component using React Native Reanimated.
 * Mimics a pulsing loading state for images and text blocks.
 * 
 * @param props Dimensions and styling properties for the skeleton.
 */
const BaseSkeleton: React.FC<BaseSkeletonProps> = ({ width, height, borderRadius, style }) => {
    const { theme } = useAppTheme();
    const opacity = useSharedValue(0.5);

    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 800 }),
                withTiming(0.5, { duration: 800 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const defaultStyle: ViewStyle = {
        width: width ?? '100%',
        height: height ?? '100%',
        borderRadius: borderRadius ?? moderateScale(8),
        backgroundColor: COLORS[theme]['surface-alt'],
    };

    return (
        <Animated.View style={[defaultStyle, style, animatedStyle]} />
    );
};

export default React.memo(BaseSkeleton);
