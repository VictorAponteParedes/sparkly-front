import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from 'react-native-date-picker';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Icon } from '../../common/Icon';
import { colors } from '../../../theme/theme';
import styles from './styles';

interface DatePickerProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    error?: string;
    required?: boolean;
    maximumDate?: Date;
    minimumDate?: Date;
}

export const DatePicker = <T extends FieldValues>({
    control,
    name,
    label,
    error,
    required = false,
    maximumDate,
    minimumDate,
}: DatePickerProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label} {required && <Text style={styles.required}>*</Text>}
                </Text>
            )}

            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <>
                        <TouchableOpacity
                            style={[styles.dateButton, error && styles.dateButtonError]}
                            onPress={() => setIsOpen(true)}
                        >
                            <Text style={[
                                styles.dateText,
                                !value && styles.placeholderText
                            ]}>
                                {value ? formatDate(new Date(value)) : 'Selecciona una fecha'}
                            </Text>
                            <Icon name="calendar" size={20} color={colors.gray[600]} />
                        </TouchableOpacity>

                        <DateTimePicker
                            modal
                            open={isOpen}
                            date={value ? new Date(value) : new Date()}
                            mode="date"
                            onConfirm={(date) => {
                                setIsOpen(false);
                                onChange(date.toISOString());
                            }}
                            onCancel={() => setIsOpen(false)}
                            maximumDate={maximumDate}
                            minimumDate={minimumDate}
                            locale="es"
                            title="Selecciona una fecha"
                            confirmText="Confirmar"
                            cancelText="Cancelar"
                        />
                    </>
                )}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};