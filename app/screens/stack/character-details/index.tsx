import { View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '$types/navigation.types'
import { EStackScreens } from '$constants/screen.constants'
import { BaseImage, IconButton, ThemedView, ThemeText } from '$components/ui'
import { useAppTheme } from '$hooks/common'
import { moderateScale } from '$constants/styles.constants'
import { styling } from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { ChevronLeft, Heart } from 'lucide-react-native'
import { StatusBadge } from '$components/layout'

const CharacterDetails: React.FC<AppStackScreenProps<EStackScreens.CHARACTER_DETAIL>> = ({ navigation }) => {

    const { colors, theme, insets } = useAppTheme();
    const styles = styling(theme, insets);

    return (
        <ThemedView>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
                overScrollMode='never'
            >
                <View style={styles.image}>
                    <BaseImage
                        wrapperStyle={{ width: '100%', height: '100%' }}
                        source={{ uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' }}
                        resizeMode={'cover'}
                    />

                    <View style={styles.statusWrapper}>
                        <StatusBadge theme={theme} status='Alive' />
                    </View>
                </View>

                <View style={styles.content}>
                    <ThemeText numberOfLines={2} style={styles.title}>{'Rick Sanchez'}</ThemeText>

                    <View style={styles.flexRow}>
                        <ThemeText style={styles.keyLabel}>Species: </ThemeText>
                        <ThemeText style={styles.keyValue}>Human</ThemeText>
                    </View>
                    <View style={styles.flexRow}>
                        <ThemeText style={styles.keyLabel}>Gender: </ThemeText>
                        <ThemeText style={styles.keyValue}>Male</ThemeText>
                    </View>
                    <View style={styles.flexRow}>
                        <ThemeText style={styles.keyLabel}>Origin: </ThemeText>
                        <ThemeText style={styles.keyValue}>Earth (C-137)</ThemeText>
                    </View>
                    <View style={styles.flexRow}>
                        <ThemeText style={styles.keyLabel}>Location: </ThemeText>
                        <ThemeText style={styles.keyValue}>Citadel of Ricks</ThemeText>
                    </View>

                    <View style={styles.section}>
                        <ThemeText variant='h3'>Episodes:</ThemeText>

                        <View style={styles.episodes}>
                            {Array.from({ length: 20 }, (_, idx) => {

                                const episodeNumber = 'https://rickandmortyapi.com/api/episode/1'.split('/').pop();

                                return (
                                    <View
                                        key={`${idx}`}
                                        style={styles.episode}
                                    >
                                        <ThemeText variant='body2'>{`E${episodeNumber}`}</ThemeText>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>


                <View style={styles.headerActions}>
                    <IconButton
                        style={styles.headerAction}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft width={moderateScale(24)} height={moderateScale(24)} color={colors['text-primary']} />
                    </IconButton>
                    <IconButton
                        style={styles.headerAction}
                    >
                        <Heart width={moderateScale(24)} height={moderateScale(24)} color={colors['text-primary']} />
                    </IconButton>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

export default CharacterDetails;
