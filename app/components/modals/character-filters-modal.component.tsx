import { SheetModalRef } from '$types/common.types';
import { ITheme } from '$types/theme.types';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { BaseButton, BaseChip, IconButton, ThemeText } from '$components/ui';
import { COLORS } from '$constants/colors.constants';
import { moderateScale, EFontSize, EFonts } from '$constants/styles.constants';
import { X } from 'lucide-react-native';
import { GENDER_OPTIONS, STATUS_OPTIONS } from '$constants/app.constants';

interface CharacterFilterModalProps {
    theme: ITheme;
    onApply?: (filters: { status: string; gender: string }) => void;
}

interface CharacterFilterModalRef extends SheetModalRef { };

/**
 * Bottom sheet modal component that allows the user to filter characters
 * by their status (Alive, Dead, Unknown) and gender (Male, Female, etc.).
 * 
 * @param props Component properties containing the apply filter callback.
 * @param ref Forwarded reference to control the modal's open/close state.
 */
const CharacterFilterModal = forwardRef<CharacterFilterModalRef, CharacterFilterModalProps>(({
    theme,
    onApply
}, ref) => {

    const [visible, setVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedGender, setSelectedGender] = useState<string>('');

    const styles = styling(theme);

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
    }));

    const handleApply = () => {
        onApply?.({ status: selectedStatus, gender: selectedGender });
        setVisible(false);
    };

    const handleReset = () => {
        setSelectedStatus('');
        setSelectedGender('');
    };

    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(false)}
            onDismiss={() => setVisible(false)}
            animationType='slide'
            transparent
        >
            <View style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.backdrop} />
                </TouchableWithoutFeedback>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <ThemeText style={styles.title}>Filters</ThemeText>
                        <IconButton onPress={() => setVisible(false)}>
                            <X size={moderateScale(24)} color={COLORS[theme]['text-primary']} />
                        </IconButton>
                    </View>

                    <View style={styles.section}>
                        <ThemeText style={styles.sectionTitle}>Status</ThemeText>
                        <View style={styles.chips}>
                            {STATUS_OPTIONS.map(status =>
                                <BaseChip
                                    key={status}
                                    theme={theme}
                                    label={status}
                                    selected={selectedStatus === status}
                                    onPress={() => setSelectedStatus(selectedStatus === status ? '' : status)}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <ThemeText style={styles.sectionTitle}>Gender</ThemeText>
                        <View style={styles.chips}>
                            {GENDER_OPTIONS.map(gender =>
                                <BaseChip
                                    key={gender}
                                    theme={theme}
                                    label={gender}
                                    selected={selectedGender === gender}
                                    onPress={() => setSelectedGender(selectedGender === gender ? '' : gender)}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.actions}>
                        <BaseButton
                            theme={theme}
                            label='Reset'
                            onPress={handleReset}
                            outline
                            containerStyle={styles.action}
                        />
                        <BaseButton
                            theme={theme}
                            label='Apply'
                            onPress={handleApply}
                            containerStyle={styles.action}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export default CharacterFilterModal;

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "flex-end"
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        backgroundColor: COLORS[theme]['surface-alt'],
        borderTopLeftRadius: moderateScale(24),
        borderTopRightRadius: moderateScale(24),
        padding: moderateScale(24),
        paddingBottom: moderateScale(48),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(24),
    },
    title: {
        fontSize: EFontSize.XL,
        fontFamily: EFonts.SEMI_BOLD,
        color: COLORS[theme]['text-primary'],
    },
    section: {
        marginBottom: moderateScale(24),
    },
    sectionTitle: {
        fontSize: EFontSize.LG,
        fontFamily: EFonts.MEDIUM,
        color: COLORS[theme]['text-primary'],
        marginBottom: moderateScale(12),
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(12),
    },
    actions: {
        flexDirection: 'row',
        gap: moderateScale(16),
        marginTop: moderateScale(8),
    },
    action: {
        flex: 1,
    }
})