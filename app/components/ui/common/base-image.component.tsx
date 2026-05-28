import React, { useState } from "react";
import { moderateScale } from "$constants/styles.constants"
import { StyleSheet, StyleProp, ViewStyle, View, ViewProps } from "react-native"
import FastImage, { FastImageProps, ImageStyle } from "@d11/react-native-fast-image";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import BaseSkeleton from "./base-skeleton.component";
import { COLORS } from "$constants/colors.constants";

interface AutoImageProps extends Omit<FastImageProps, 'style'> {
    width?: number;
    height?: number;
    wrapperStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    wrapperProps?: ViewProps;
}

/**
 * Enhanced image component that supports fast loading, caching, and fallback states.
 * Wraps FastImage for optimal performance in React Native.
 * Uses an animated skeleton overlay while loading.
 * 
 * @param props Image properties including source, resizeMode, and styles.
 */
const BaseImage = (props: AutoImageProps) => {

    const { width: BASE_WIDTH, height: BASE_HEIGHT, imageStyle, wrapperStyle, wrapperProps, ...imageProps } = props;
    const [isLoaded, setIsLoaded] = useState(false);

    const overlayAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isLoaded ? 0 : 1, { duration: 300 })
        };
    });

    return (
        <View {...wrapperProps} style={[styles.wrapper, { width: BASE_WIDTH, height: BASE_HEIGHT }, wrapperStyle]}>
            <FastImage
                {...imageProps}
                onLoadEnd={() => {
                    setIsLoaded(true);
                    imageProps.onLoadEnd && imageProps.onLoadEnd();
                }}
                style={[styles.image, imageStyle]}
            />
            <Animated.View style={[StyleSheet.absoluteFillObject, overlayAnimatedStyle]} pointerEvents="none">
                <BaseSkeleton width="100%" height="100%" borderRadius={0} />
            </Animated.View>
        </View>
    )
}

export default React.memo(BaseImage);

const styles = StyleSheet.create({
    wrapper: {
        width: moderateScale(100),
        height: moderateScale(100),
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: COLORS.light['surface-alt'], // Default fallback
    },
    image: {
        width: '100%',
        height: '100%'
    }
})