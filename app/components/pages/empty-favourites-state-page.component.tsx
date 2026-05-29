import { StyleSheet, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { useAppTheme } from '$hooks/common'
import { COLORS } from '$constants/colors.constants'
import { ThemeText } from '$components/ui'
import { ITheme } from '$types/theme.types'
import { HeartOff } from 'lucide-react-native'

/**
 * Page component displayed when the user has no favourite characters saved.
 * Renders an empty state illustration and prompt.
 * 
 * @returns The empty state view component.
 */
const EmptyFavouritesStatePage = () => {

  const { theme, colors } = useAppTheme();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <HeartOff size={moderateScale(48)} color={colors['text-secondary']} />
      <ThemeText style={styles.label} variant='h2'>No favourites yet</ThemeText>
      <ThemeText style={styles.description} variant='body2'>Characters you heart will appear here</ThemeText>
    </View>
  )
}

export default React.memo(EmptyFavouritesStatePage);

const styling = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(20),
    padding: moderateScale(20),
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(15),
    width: '100%'
  },
  label: {
    fontFamily: EFonts.SEMI_BOLD,
    fontSize: EFontSize['2XL'],
    color: COLORS[theme]['text-primary']
  },
  description: {
    fontFamily: EFonts.MEDIUM,
    fontSize: EFontSize.LG,
    color: COLORS[theme]['text-secondary']
  },
})