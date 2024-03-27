import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { RouteProp, useRoute } from '@react-navigation/native';
import SetCard from '../components/setCard';
import MidTextSeparator from '../components/midTextSeparator';
import { Exercise } from '../utils/data';
import CustomVideoPlayer from '../components/customVideoPlayer';

type StackParamList = {
    Detail: { exercise: Exercise };
};

type DetailScreenRouteProp = RouteProp<StackParamList, 'Detail'>;

function ExcerciseDetail(): React.JSX.Element {
    const route = useRoute<DetailScreenRouteProp>();
    const { exercise } = route.params;
    const sortedSets = exercise.sets.sort((a, b) => a.effortLevel - b.effortLevel);
    console.log(sortedSets)
    return (
        <View>
            <CustomVideoPlayer name={exercise.name} videoURI={exercise.videoLink} />
            <View style={tw`py-4 px-8`}>
                <Text style={tw`text-center uppercase font-bold mb-4`}>Walk Through</Text>
                {
                    sortedSets.map((set, index) => {
                        if (index === 0) {
                            return (
                                <View key={index}>
                                    <SetCard index={0} reps={set.reps} effortLevel={set.effortLevel} />
                                    <MidTextSeparator name="Working Sets" />
                                </View>
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
