import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'

interface cardProps {
    index: number,
    reps: number,
    effortLevel: number
}

export const SetCard = ({ index, reps, effortLevel }: cardProps) => {
    return (
        <View style={tw`flex flex-row justify-between items-center mb-5`}>
            <Text style={tw`uppercase font-bold text-2xl text-[#55bfa9]`}>{index}</Text>
            <Text style={tw`text-center uppercase font-bold text-2xl`}>{reps} Reps</Text>
            <View style={tw``}>
                <Text style={tw`uppercase font-bold text-lg`}>{effortLevel}%</Text>
                <Text style={tw`uppercase font-bold text-[10px]`}>Effort Level</Text>
            </View>
        </View>
    )
}

export default SetCard