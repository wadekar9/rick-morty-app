import React from 'react'
import { Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { EFonts, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';
import { ThemeText } from '../themed';
import { ITheme } from '$types/theme.types';

interface BaseButtonProps extends PressableProps {
  theme?: ITheme;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  RightAccessory?: React.ReactNode;
  LeftAccessory?: React.ReactNode;
  outline?: boolean;
  disabled?: boolean;
};

/**
 * Primary button component used throughout the application.
 * Supports multiple variants (primary, secondary, outline) and loading states.
 * 
 * @param props Base button properties including variant and title.
 */
const BaseButton: React.FC<BaseButtonProps> = ({
  theme = 'light',
  label,
  labelStyle,
  containerStyle,
  RightAccessory,
  LeftAccessory,
  outline,
  disabled = false,
  ...props
}) => {

  const styles = styling(theme);

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={[
        styles.wrapper,
        outline && styles.outlineWrapper,
        disabled && { opacity: 0.5 },
        containerStyle
      ]}
      accessibilityRole={props.accessibilityRole || "button"}
      accessibilityState={{ ...props.accessibilityState, disabled: !!disabled }}
    >
      {!!LeftAccessory && LeftAccessory}
      <ThemeText style={[styles.label, outline && styles.outlineLabel, labelStyle]}>{label}</ThemeText>
      {!!RightAccessory && RightAccessory}
    </Pressable>
  )
}

export default React.memo(BaseButton);

const styling = (theme: ITheme) => StyleSheet.create({
  wrapper: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: moderateScale(5),
    gap: moderateScale(10),
    backgroundColor: COLORS[theme]['brand-primary']
  },
  outlineWrapper: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS[theme]['brand-primary']
  },
  label: {
    fontFamily: EFonts.MEDIUM,
    fontSize: moderateScale(15),
    color: COLORS[theme].surface,
    textTransform: 'capitalize'
  },
  outlineLabel: {
    color: COLORS[theme]['brand-primary']
  }
})  