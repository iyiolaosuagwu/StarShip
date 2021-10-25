import React from 'react';
import {
    NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailScreen, HomeScreen, StarShipsScreen, CharacterScreen } from '../../app/screens';


const Stack = createNativeStackNavigator();

const Index = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false,
                    gestureDirection: 'horizontal',
                    gestureEnabled: true,
                }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="StarShipsScreen" component={StarShipsScreen} />
                <Stack.Screen name="CharacterScreen" component={CharacterScreen} />
                <Stack.Screen name="DetailScreen" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Index;
