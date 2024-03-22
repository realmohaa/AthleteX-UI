import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { Avatar } from 'react-native-elements';

interface headerProps {
    username: string
}

export const header = ({ username }: headerProps) => {
    return (
        <View style={tw`pt-12 pb-4 flex flex-row gap-2 items-center`}>
            <Avatar containerStyle={{backgroundColor: "#55bfa9"}} size={30} rounded title="UN" />
            <Text style={tw`text-sm text-[#3c403d]`}>{username}</Text> 
        </View>
    )
}

export default header