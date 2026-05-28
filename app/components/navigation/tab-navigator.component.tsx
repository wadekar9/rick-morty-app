import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ITheme } from '$types/theme.types';
import { COLORS } from '$constants/colors.constants';
import { moderateScale } from '$constants/styles.constants';

interface TabNavigatorProps extends BottomTabBarProps {
    theme: ITheme;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({
    state,
    descriptors,
    navigation,
    theme,
    insets
}) => {

    const styles = styling(theme);

    return (
        <View style={[styles.wrapper, { bottom: insets.bottom }]}>
            <View style={styles.container}>
                {
                    state.routes.map((route, idx) => {

                        const { options } = descriptors[route.key];
                        const isFocused = state.index === idx;
                        const icon = options.tabBarIcon;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name, route.params);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <Pressable
                                key={`route-${idx}`}
                                style={styles.button}
                                onPress={onPress}
                                onLongPress={onLongPress}
                            >
                                {icon && icon({ focused: isFocused, color: isFocused ? COLORS[theme]['brand-primary'] : COLORS[theme]['icon-default'], size: moderateScale(28) })}
                            </Pressable>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default React.memo(TabNavigator);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        width: '100%',
        position: 'absolute',
        padding: moderateScale(20),
        paddingTop: 0,
        backgroundColor: 'transparent'
    },
    container: {
        width: '100%',
        backgroundColor: COLORS[theme].surface,
        height: moderateScale(65),
        borderRadius: moderateScale(100),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS[theme]['icon-default'],
        overflow: 'hidden',
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})