import React, { useState } from 'react'
import tw from 'twrnc'
import { TextInput, HelperText } from 'react-native-paper';

interface cardProps {
    placeholder: string,
    name: string,
    isSecured?: boolean,
    icon?: string,
    setName: (name: string) => void,
}

export const CustomInput = ({ placeholder, name, isSecured = false, icon, setName }: cardProps) => {
    return (
      <TextInput
        style={tw`bg-transparent h-11`}
        placeholderTextColor={"#55bfa9"}
        contentStyle={icon ? tw`bg-white rounded-r-full` : tw`bg-white rounded-full`}
        left={icon ? <TextInput.Icon icon={icon} color="#55bfa9" style={tw`bg-white rounded-r-none rounded-l-full h-11 pl-4`} /> : null}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        selectionColor='#55bfa9'
        placeholder={placeholder}
        value={name}
        onChangeText={setName}
        secureTextEntry={isSecured ? true : false} 
      />
    )
}

export default CustomInput