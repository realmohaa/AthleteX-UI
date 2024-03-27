import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { Avatar } from 'react-native-elements';
import { Button } from '@rneui/base';
import { AuthContext, removeValue } from '../utils/util';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';

interface headerProps {
    username: string
}

export const header = ({ username }: headerProps) => {
    const { setIsSignedIn } = useContext(AuthContext);

    const navigation = useNavigation();

    const logout = async () => {
        // Clear user data from storage
        await removeValue('user');
        await removeValue('user-workout');
        // Update isSignedIn state
        setIsSignedIn(false);
        // Navigate to login screen
        navigation.navigate('Login' as never)
      };

    return (
        <View style={tw`pt-12 pb-4 flex flex-row gap-2 items-center justify-between`}>
            <View style={tw`flex flex-row gap-2 items-center`}>
                <Avatar containerStyle={{backgroundColor: "#55bfa9"}} size={30} rounded title={username.charAt(0).toUpperCase()} />
                <Text style={tw`text-sm text-[#3c403d]`}>{username}</Text> 
            </View>
            <Button type='clear' style={tw`text-[10px] text-[#3c403d]`} onPress={() => logout()}>
                <AntDesign name="logout" size={26} color="#55bfa9" />
            </Button> 
        </View>
    )
}

export default header