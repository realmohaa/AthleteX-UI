import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { Feather } from '@expo/vector-icons';
interface cardProps {
    index: number,
    reps: string,
    effortLevel: number
}

export const SetCard = ({ index, reps, effortLevel }: cardProps) => {
    return (
        <View style={tw`flex flex-row justify-between items-center mb-5`}>
            {
            index > 0 
            ? 
            <Text style={tw`uppercase font-bold text-2xl text-[#55bfa9]`}>{index}</Text> 
            : 
            <Feather name="arrow-up-right" size={30} color="#55bfa9"/>
            }
            <Text style={tw`text-center uppercase font-bold text-2xl`}>{reps} Reps</Text>
            <View style={tw``}>
                <Text style={tw`uppercase font-bold text-lg`}>{effortLevel}%</Text>
                <Text style={tw`uppercase font-bold text-[10px]`}>Effort Level</Text>
            </View>
        </View>
    )
}

export default SetCard