import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from '../Input';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Icon } from '../../common/Icon';
import { colors } from '../../../theme/theme';

interface PasswordInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    error?: string;
    required?: boolean;
    placeholder?: string;
}

export const PasswordInput = <T extends FieldValues>({
    control,
    name,
    label,
    error,
    required = false,
    placeholder = "Ingresa tu contraseña",
}: PasswordInputProps<T>) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <View>
            <Input
                control={control}
                name={name}
                label={label}
                error={error}
                required={required}
                placeholder={placeholder}
                secureTextEntry={!isVisible}
                rightIcon={
                    <TouchableOpacity
                        onPress={() => setIsVisible(!isVisible)}
                        style={styles.eyeButton}
                    >
                        <Icon
                            name={isVisible ? "eye" : "eye-off"}
                            size={20}
                            color={colors.gray[500]}
                        />
                    </TouchableOpacity>
                }
            />
        </View>
    );
};

const styles = {
    eyeButton: {
        padding: 4,
    },
};