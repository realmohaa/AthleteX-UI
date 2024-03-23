import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { RouteProp, useRoute } from '@react-navigation/native';
import SetCard from '../components/setCard';
import MidTextSeparator from '../components/midTextSeparator';
import { Excercise, testSets } from '../utils/data';
import CustomVideoPlayer from '../components/customVideoPlayer';

type StackParamList = {
    Detail: { excercise: Excercise };
};

type DetailScreenRouteProp = RouteProp<StackParamList, 'Detail'>;

const sortedTestSets = testSets.sort((a, b) => a.effortLevel - b.effortLevel);

function ExcerciseDetail(): React.JSX.Element {
    const route = useRoute<DetailScreenRouteProp>();
    const { excercise } = route.params;
    return (
        <View>
            <CustomVideoPlayer name={excercise.name} videoURI={excercise.videoLink} />
            <View style={tw`py-4 px-8`}>
                <Text style={tw`text-center uppercase font-bold mb-4`}>Walk Through</Text>
                {
                    sortedTestSets.map((set, index) => {
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
