import { MaterialCommunityIcons, FontAwesome6  } from '@expo/vector-icons'
import React from 'react'
import { Image, ImageSourcePropType, Text, View } from 'react-native'
import tw from 'twrnc'

interface cardProps {
    name: string,
    duration: number,
    reps: number,
    img: ImageSourcePropType,
    onPress?: () => void
}

export const ExcerciseCard = ({ name, duration, reps, img }: cardProps) => {
    return (
        <View style={tw`flex flex-row border-[1.7px] border-neutral-400 rounded-2xl mb-2 overflow-hidden`}>
            <Image source={img} style={tw`w-30 h-30 -ml-1`} />
            <View style={tw`flex flex-col px-4 py-2`}>
                <Text style={tw`font-bold`}>{name}</Text>
                <View style={tw`flex flex-row gap-4 py-1`}>
                    <View style={tw`flex flex-row items-center gap-2`}>
                        <MaterialCommunityIcons name="clock" size={14} color="#55bfa9" />
                        <View style={tw`flex flex-row items-end gap-1`}>
                            <Text style={tw`font-bold text-xl`}>{duration}</Text>
                            <Text style={tw`font-bold text-[10px]`}>Mins</Text>
                        </View>
                    </View>
                    <View style={tw`flex flex-row items-center gap-2`}>
                        <FontAwesome6 name="repeat" size={14} color="#55bfa9" />
                        <View style={tw`flex flex-row items-end gap-1`}>
                            <Text style={tw`font-bold text-xl`}>{reps}</Text>
                            <Text style={tw`font-bold text-[10px]`}>Reps</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ExcerciseCard