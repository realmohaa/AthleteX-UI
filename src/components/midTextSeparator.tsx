import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'

interface cardProps {
    name: string,
}

export const MidTextSeparator = ({ name }: cardProps) => {
    return (
        <View style={tw`flex-row items-center pb-6`}>
        <View style={tw`flex-1 h-[1px] bg-black/30`} />
        <View>
            <Text style={tw`px-2 uppercase font-bold opacity-90`}>{name}</Text>
        </View>
        <View style={tw`flex-1 h-[1px] bg-black/30`} />
    </View>
    )
}

export default MidTextSeparator