import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { Avatar } from 'react-native-elements';
import { Goal } from '../utils/data';
interface cardProps {
    selectedGoals: Goal[]
}

export const GoalsCard = ({selectedGoals}: cardProps) => {
    return (
        <View style={tw`pt-6 pb-4 px-6 flex flex-row gap-4 items-center`}>
            <Text style={tw`text-sm text-[#3c403d] w-[30%]`}>Goals for your workout</Text>
            {
                selectedGoals.map((goal, index) => {
                    return(
                        <View style={tw`flex flex-row gap-2`} key={index}>
                        <View>
                            <Avatar 
                                containerStyle={{
                                    backgroundColor: "transparent",
                                    borderRadius:100, 
                                    borderStyle:"solid", 
                                    borderWidth:1,
                                    padding: 4
                                }} 
                                size={60}
                                source={goal.img}
                                rounded title="" 
                            />
                            <Text style={tw`text-[10px] text-[#3c403d] text-center`}>{goal.name}</Text>
                        </View>
                    </View>
                    )
            })
            }
        </View>
    )
}

export default GoalsCard