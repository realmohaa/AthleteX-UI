import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { RouteProp, useRoute } from '@react-navigation/native';
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import SetCard from '../components/setCard';
import MidTextSeparator from '../components/midTextSeparator';
import { Excercise, testSets } from '../utils/data';

type StackParamList = {
    Detail: { excercise: Excercise };
};

type DetailScreenRouteProp = RouteProp<StackParamList, 'Detail'>;

const sortedTestSets = testSets.sort((a, b) => a.effortLevel - b.effortLevel);

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
                {
                    sortedTestSets.map((set, index) => {
                        if (index === 0) {
                            return (
                            <>
                            <SetCard key={index} index={0} reps={set.reps} effortLevel={set.effortLevel} />
                            <MidTextSeparator name="Working Sets" />
                            </>
                            )
                        }
                        return <SetCard key={index} index={index} reps={set.reps} effortLevel={set.effortLevel} />
                    })
                }
            </View>
        </View>
    );
}

export default ExcerciseDetail;
