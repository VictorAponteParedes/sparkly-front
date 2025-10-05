import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { colors } from '../../../theme/theme';
import styles from './styles';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    error?: string;
    required?: boolean;
    options: SelectOption[];
    placeholder?: string;
}

export const Select = <T extends FieldValues>({
    control,
    name,
    label,
    error,
    required = false,
    options,
    placeholder = "Selecciona una opción",
}: SelectProps<T>) => {
    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label} {required && <Text style={styles.required}>*</Text>}
                </Text>
            )}

            <View style={[styles.pickerContainer, error && styles.pickerError]}>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={styles.picker}
                            dropdownIconColor={colors.gray[600]}
                        >
                            <Picker.Item label={placeholder} value="" />
                            {options.map((option, index) => (
                                <Picker.Item
                                    key={index}
                                    label={option.label}
                                    value={option.value}
                                />
                            ))}
                        </Picker>
                    )}
                />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};