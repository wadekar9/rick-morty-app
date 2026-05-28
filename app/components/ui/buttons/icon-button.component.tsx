import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'

/**
 * A reusable button component that renders an icon with tap interactions.
 * Supports customizable icons, styling, and hitSlop areas.
 * 
 * @param props The icon button properties.
 */
const IconButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      {...props}
      accessibilityRole={props.accessibilityRole || 'button'}
      role={props.role || 'button'}
      accessibilityState={{ ...props.accessibilityState, disabled: !!props.disabled }}
    >
      {props.children}
    </TouchableOpacity>
  )
}

export default React.memo(IconButton);