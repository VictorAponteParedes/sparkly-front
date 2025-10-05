import React from 'react';
import { View, Text } from 'react-native';
import { Input } from '../Input';
import { Control, FieldValues, Path } from 'react-hook-form';
import { colors } from '../../../theme/theme';

interface TextAreaProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    error?: string;
    required?: boolean;
    maxLength?: number;
    placeholder?: string;
}

export const TextArea = <T extends FieldValues>({
    control,
    name,
    label,
    error,
    required = false,
    maxLength = 500,
    placeholder,
}: TextAreaProps<T>) => {
    return (
        <View>
            <Input
                control={control}
                name={name}
                label={label}
                error={error}
                required={required}
                multiline
                numberOfLines={4}
                maxLength={maxLength}
                placeholder={placeholder}
            />

            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>
                    {control._formValues[name]?.length || 0}/{maxLength} caracteres
                </Text>
            </View>
        </View>
    );
};

const styles = {
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
    },
    counterText: {
        fontSize: 12,
        color: colors.gray[500],
    },
};