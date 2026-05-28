import { View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '$types/navigation.types'
import { EStackScreens } from '$constants/screen.constants'
import { BaseImage, IconButton, ThemedView, ThemeText } from '$components/ui'
import { useAppDispatch, useAppSelector, useAppTheme } from '$hooks/common'
import { moderateScale } from '$constants/styles.constants'
import { styling } from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { ChevronLeft, Heart } from 'lucide-react-native'
import { StatusBadge } from '$components/layout'
import { ICharacter } from '$types/data.types'
import { toggleFavourite } from '$store/actions/favourite.actions'

const CharacterDetails: React.FC<AppStackScreenProps<EStackScreens.CHARACTER_DETAIL>> = ({ navigation, route }) => {

    const { colors, theme, insets } = useAppTheme();
    const styles = styling(theme, insets);
    const character: ICharacter = JSON.parse(route.params.character);

    const dispatch = useAppDispatch();
    const favourites = useAppSelector((state) => state.favourites) || [];
    const isFavourite = favourites.some((fav: ICharacter) => fav.id === character.id);

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
                        source={{ uri: character?.image }}
                        resizeMode={'cover'}
                    />

                    <View style={styles.statusWrapper}>
                        <StatusBadge theme={theme} status={character?.status} />
                    </View>
                </View>

                <View style={styles.content}>
                    <ThemeText numberOfLines={2} style={styles.title}>{character?.name}</ThemeText>

                    <View style={styles.flexRow}>
                        <ThemeText style={styles.keyLabel}>Species: </ThemeText>
                        <ThemeText style={styles.keyValue}>{character?.species}</ThemeText>
                    </View>
                    <View style={styles.flexRow}>
                        <ThemeText style={styles.keyLabel}>Gender: </ThemeText>
                        <ThemeText style={styles.keyValue}>{character?.gender}</ThemeText>
                    </View>
                    <View style={styles.flexRow}>
                        <ThemeText style={styles.keyLabel}>Origin: </ThemeText>
                        <ThemeText style={styles.keyValue}>{character?.origin?.name}</ThemeText>
                    </View>
                    <View style={styles.flexRow}>
                        <ThemeText style={styles.keyLabel}>Location: </ThemeText>
                        <ThemeText numberOfLines={2} style={styles.keyValue}>{character?.location?.name}</ThemeText>
                    </View>

                    <View style={styles.section}>
                        <ThemeText variant='h3'>Episodes:</ThemeText>

                        <View style={styles.episodes}>
                            {character?.episode?.map((item: string, idx: number) => {

                                const episodeNumber = item.split('/').pop();

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
                        onPress={() => dispatch(toggleFavourite(character))}
                    >
                        <Heart
                            width={moderateScale(24)}
                            height={moderateScale(24)}
                            color={isFavourite ? colors['brand-primary'] : colors['text-primary']}
                            fill={isFavourite ? colors['brand-primary'] : 'none'}
                        />
                    </IconButton>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

export default CharacterDetails;
