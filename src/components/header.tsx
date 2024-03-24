import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { Avatar } from 'react-native-elements';
import { Button } from '@rneui/base';
import { getData, removeValue } from '../utils/util';
import { useNavigation } from '@react-navigation/native';

interface headerProps {
    username: string
}

export const header = ({ username }: headerProps) => {
    const navigation = useNavigation();
    const logout = () => {
            removeValue('user');
            const user = getData('user');
            console.log(user)
            if (!user) {
                navigation.reset({
                    index: 1,
                    routes: [{ name: 'Login' as never }, { name: 'Register' as never }],
                });
            }
    }
    return (
        <View style={tw`pt-12 pb-4 flex flex-row gap-2 items-center justify-between`}>
            <View style={tw`flex flex-row gap-2 items-center`}>
                <Avatar containerStyle={{backgroundColor: "#55bfa9"}} size={30} rounded title="UN" />
                <Text style={tw`text-sm text-[#3c403d]`}>{username}</Text> 
            </View>
            <Button type='clear' style={tw`text-[10px] text-[#3c403d]`} onPress={() => logout()}>logout</Button> 
        </View>
    )
}

export default header