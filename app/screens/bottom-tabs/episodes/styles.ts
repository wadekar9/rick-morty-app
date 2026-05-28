import { COLORS } from '$constants/colors.constants';
import { ITheme } from '$types/theme.types';;
import { StyleSheet } from 'react-native';

export const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS[theme].background,
    },
});
