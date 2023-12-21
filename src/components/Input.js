import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const Input = ({ className = '', onChangeText = null, placeholder = null, defaultValue = null, icon = null }) => {
    return (
        <View className="relative flex items-center border border-primaryColor rounded-md p-2 w-full">
            {icon && (
                <View className="flex items-center justify-center w-8 h-8 mr-4 bg-red-500 rounded-full">
                    {icon}
                </View>
            )}
            <TextInput
                className={`w-full ring-2 ring-primaryColor ${className}`}
                onChangeText={onChangeText}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </View>
    );
};

Input.propTypes = {
    className: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    icon: PropTypes.element,
};

export default Input;
