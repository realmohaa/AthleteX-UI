import React from 'react'
import { Image, ImageSourcePropType, Text, View } from 'react-native'
import tw from 'twrnc'

interface cardProps {
    name: string,
    count: number,
    reps: number,
    img: ImageSourcePropType,
    onPress?: () => void
}

export const ExcerciseCard = ({ name, count, reps, img }: cardProps) => {
    return (
        <View style={tw`flex flex-row border-[1px] rounded-2xl mb-2`}>
            <Image source={img} style={tw`w-30 h-30 rounded-2xl `} />
            <View style={tw`flex flex-col p-4`}>
                <Text style={tw`font-bold`}>{name}</Text>
                <View style={tw`flex flex-row gap-4 py-4`}>
                    <Text style={tw`font-bold text-xl`}>{count}</Text>
                    <Text style={tw`font-bold text-xl`}>{reps} Reps</Text>
                </View>
            </View>
        </View>
    )
}

export default ExcerciseCard