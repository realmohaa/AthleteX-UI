import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import tw from 'twrnc';
import { RouteProp, useRoute } from '@react-navigation/native';
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import SetCard from '../components/setCard';
import MidTextSeparator from '../components/midTextSeparator';

type StackParamList = {
    Detail: { excercise: Excercise };
  };

type DetailScreenRouteProp = RouteProp<StackParamList, 'Detail'>;
  
type Excercise = {
    name: string;
    description: string;
    effortLevel: number;
    videoLink: string;
    category: string;
    duration: number;
    reps: number;
    sets: number;
}

function ExcerciseDetail(): React.JSX.Element {
    const route = useRoute<DetailScreenRouteProp>();
    const { excercise } = route.params;
    return (
        <View style={tw``}>
            <View style={tw`relative`}>
                <VideoPlayer
                    style={tw`h-100`}
                    videoProps={{
                        shouldPlay: true,
                        resizeMode: ResizeMode.COVER,
                        source: {uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
                    }}
                />
                <View style={tw`absolute w-full bottom-0 py-6 flex flex-row justify-between items-center`}>
                    <LinearGradient
                        colors={['transparent', 'black']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={tw`absolute top-0 left-0 right-0 bottom-0 w-full`}
                    />
                    <Text style={tw`font-bold text-white text-xl ml-4`}>{excercise.name}</Text>
                    <MaterialIcons name="sports-handball" style={tw`bg-white rounded-full p-2 mr-4`} size={30} color="black" />
                </View>
            </View>
            <View style={tw`py-4 px-8`}>
                <Text style={tw`text-center uppercase font-bold mb-4`}>Walk Through</Text>
                <View style={tw`flex flex-row justify-between items-center`}>
                    <Feather name="arrow-up-right" size={30} color="#55bfa9"/>
                    <Text style={tw`text-center uppercase font-bold text-2xl`}>3 REPS</Text>
                    <View style={tw``}>
                        <Text style={tw`uppercase font-bold text-lg`}>10%</Text>
                        <Text style={tw`uppercase font-bold text-[10px]`}>Effort Level</Text>
                    </View>
                </View>
                <MidTextSeparator name="Working Sets" />
                <SetCard index={1} reps={5} effortLevel={60} />
                <SetCard index={2} reps={5} effortLevel={100} />
            </View>
        </View>
    );
}

export default ExcerciseDetail;
