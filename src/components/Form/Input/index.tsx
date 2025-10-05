import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { colors } from '../../../theme/theme';
import styles from './styles';

interface InputProps<T extends FieldValues> extends TextInputProps {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    error?: string;
    required?: boolean;
}

export const Input = <T extends FieldValues>({
    control,
    name,
    label,
    error,
    required = false,
    editable = true, // Valor por defecto
    ...props
}: InputProps<T>) => {
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
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[
                            styles.input,
                            error && styles.inputError,
                            props.multiline && styles.multilineInput,
                            !editable && styles.inputDisabled // Estilo para modo no editable
                        ]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value as string}
                        placeholderTextColor={colors.gray[400]}
                        editable={editable} // Pasa la prop editable
                        {...props}
                    />
                )}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};