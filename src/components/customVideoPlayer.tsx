import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface cardProps {
    name: string,
    videoURI: string
}

function CustomVideoPlayer({name,videoURI} : cardProps): React.JSX.Element {
    return (
        <View style={tw`relative`}>
            <VideoPlayer
                style={tw`h-100`}
                videoProps={{
                    shouldPlay: true,
                    resizeMode: ResizeMode.COVER,
                    source: {uri: videoURI},
                }}
            />
            <View style={tw`absolute w-full bottom-0 py-6 flex flex-row justify-between items-center`}>
                <LinearGradient
                    colors={['transparent', 'black']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={tw`absolute top-0 left-0 right-0 bottom-0 w-full`}
                />
                <Text style={tw`font-bold text-white text-xl ml-4`}>{name}</Text>
                <View style={tw`bg-white rounded-full p-2 mr-4`}>
                    <MaterialIcons name="sports-handball" size={30} color="black" />
                </View>
            </View>
        </View>
    );
}

export default CustomVideoPlayer;
