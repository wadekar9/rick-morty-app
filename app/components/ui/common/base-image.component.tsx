import React from "react";
import { moderateScale } from "$constants/styles.constants"
import { StyleSheet, StyleProp, ViewStyle, View, ViewProps } from "react-native"
import FastImage, { FastImageProps, ImageStyle } from "@d11/react-native-fast-image";
import { COLORS } from "$constants/colors.constants";

interface AutoImageProps extends Omit<FastImageProps, 'style'> {
    width?: number;
    height?: number;
    wrapperStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    wrapperProps?: ViewProps;
}

const BaseImage = (props: AutoImageProps) => {

    const { width: BASE_WIDTH, height: BASE_HEIGHT, imageStyle, wrapperStyle, wrapperProps, ...imageProps } = props;

    return (
        <View {...wrapperProps} style={[styles.wrapper, { width: BASE_WIDTH, height: BASE_HEIGHT }, wrapperStyle]}>
            <FastImage
                {...imageProps}
                style={[styles.image, imageStyle]}
            />
        </View>
    )
}

export default React.memo(BaseImage);

const styles = StyleSheet.create({
    wrapper: {
        width: moderateScale(100),
        height: moderateScale(100),
        backgroundColor: COLORS.light['surface-alt'],
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})