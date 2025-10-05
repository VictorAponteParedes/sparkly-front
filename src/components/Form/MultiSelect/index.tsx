import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Icon } from '../../common/Icon';
import { colors } from '../../../theme/theme';
import styles from './styles';

interface MultiSelectOption {
    label: string;
    value: string;
}

interface MultiSelectProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    error?: string;
    required?: boolean;
    options: MultiSelectOption[];
    maxSelections?: number;
}

export const MultiSelect = <T extends FieldValues>({
    control,
    name,
    label,
    error,
    required = false,
    options,
    maxSelections = 10,
}: MultiSelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

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
                render={({ field: { onChange, value } }) => {
                    const selectedValues = value || [];

                    const toggleOption = (optionValue: string) => {
                        const newValues = selectedValues.includes(optionValue)
                            ? selectedValues.filter((v: string) => v !== optionValue)
                            : [...selectedValues, optionValue];

                        if (newValues.length <= maxSelections) {
                            onChange(newValues);
                        }
                    };

                    const removeOption = (optionValue: string) => {
                        onChange(selectedValues.filter((v: string) => v !== optionValue));
                    };

                    return (
                        <>
                            {/* Selected Tags */}
                            <View style={styles.selectedContainer}>
                                {selectedValues.map((selectedValue: string) => {
                                    const option = options.find(opt => opt.value === selectedValue);
                                    return (
                                        <View key={selectedValue} style={styles.selectedTag}>
                                            <Text style={styles.selectedTagText}>{option?.label}</Text>
                                            <TouchableOpacity
                                                onPress={() => removeOption(selectedValue)}
                                                style={styles.removeButton}
                                            >
                                                <Icon name="close" size={12} color={colors.white} />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}

                                {selectedValues.length < maxSelections && (
                                    <TouchableOpacity
                                        onPress={() => setIsOpen(!isOpen)}
                                        style={styles.toggleButton}
                                    >
                                        <Icon
                                            name={isOpen ? "chevronUp" : "chevronDown"}
                                            size={16}
                                            color={colors.gray[600]}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Dropdown Options */}
                            {isOpen && (
                                <View style={styles.dropdown}>
                                    <ScrollView style={styles.dropdownScroll}>
                                        {options.map((option, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => toggleOption(option.value)}
                                                style={[
                                                    styles.option,
                                                    selectedValues.includes(option.value) && styles.optionSelected
                                                ]}
                                            >
                                                <Text style={[
                                                    styles.optionText,
                                                    selectedValues.includes(option.value) && styles.optionTextSelected
                                                ]}>
                                                    {option.label}
                                                </Text>
                                                {selectedValues.includes(option.value) && (
                                                    <Icon name="check" size={16} color={colors.pink[500]} />
                                                )}
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            {/* Selection Counter */}
                            <Text style={styles.counterText}>
                                {selectedValues.length}/{maxSelections} seleccionados
                            </Text>
                        </>
                    );
                }}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};