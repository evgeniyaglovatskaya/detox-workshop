import * as React from 'react';
import {NavigationContainer, StatusBar} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Home';
import Constants from './src/Constants';
import MovieDetails from './src/Components/MovieDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="Home" component={Home} options={{...headerStyle, title: 'Movies'}} />
        <Stack.Screen
          name="movieDetails"
          component={MovieDetails}
          options={{...headerStyle, title: 'Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyle = {
  headerStyle: {backgroundColor: Constants.baseColor},
  headerTitleStyle: {color: Constants.textColor},
};

export default App;