import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { Avatar } from 'react-native-elements';

interface headerProps {
        username: string
}

export const GoalsCard = ({ username }: headerProps) => {
    return (
        <View style={tw`pt-6 pb-4 px-6 flex flex-row gap-4 items-center`}>
            <Text style={tw`text-sm text-[#3c403d] text-break w-[30%]`}>Goals for your workout</Text> 
            <View style={tw`flex flex-row gap-2`}>
                <View>
                    <Avatar 
                        containerStyle={{
                            backgroundColor: "transparent",
                            borderRadius:100, 
                            borderStyle:"solid", 
                            borderWidth:1
                        }} 
                        size={60} 
                        rounded title="" 
                    />
                    <Text style={tw`text-[10px] text-[#3c403d] text-center`}>Shooting</Text>
                </View>
            </View>
            <View style={tw`flex flex-row gap-2`}>
                <View>
                    <Avatar 
                        containerStyle={{
                            backgroundColor: "transparent",
                            borderRadius:100, 
                            borderStyle:"solid", 
                            borderWidth:1
                        }} 
                        size={60} 
                        rounded title="" 
                    />
                    <Text style={tw`text-[10px] text-[#3c403d] text-center`}>Finsihing</Text>
                </View>
            </View>
            <View style={tw`flex flex-row gap-2`}>
                <View>
                    <Avatar 
                        containerStyle={{
                            backgroundColor: "transparent",
                            borderRadius:100, 
                            borderStyle:"solid", 
                            borderWidth:1
                        }} 
                        size={60} 
                        rounded title="" 
                    />
                    <Text style={tw`text-[10px] text-[#3c403d] text-center`}>Dribbeling</Text>
                </View>
            </View>
        </View>
    )
}

export default GoalsCard