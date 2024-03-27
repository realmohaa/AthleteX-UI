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
        <View style={tw`flex flex-row border-[1px] rounded-2xl mb-2`}>
            <Image source={img} style={tw`w-30 h-30 rounded-l-2xl`} />
            <View style={tw`flex flex-col p-4`}>
                <Text style={tw`font-bold`}>{name}</Text>
                <View style={tw`flex flex-row gap-4 py-4`}>
                    <View style={tw`flex flex-row items-center gap-2`}>
                        <MaterialCommunityIcons name="clock" size={14} color="#55bfa9" />
                        <View style={tw`flex flex-row items-end gap-1`}>
                            <Text style={tw`font-bold text-xl`}>{duration}</Text>
                            <Text style={tw`font-bold text-xs`}>Mins</Text>
                        </View>
                    </View>
                    <View style={tw`flex flex-row items-center gap-2`}>
                        <FontAwesome6 name="repeat" size={14} color="#55bfa9" />
                        <View style={tw`flex flex-row items-end gap-1`}>
                            <Text style={tw`font-bold text-xl`}>{reps}</Text>
                            <Text style={tw`font-bold text-xs`}>Reps</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ExcerciseCard