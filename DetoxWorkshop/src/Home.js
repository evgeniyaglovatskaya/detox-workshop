import React from 'react';
import { ScrollView } from 'react-native';
import DiscoverMovies from './Components/DiscoverMovies';
import Styles from './Styles';
import TrendingPeople from './Components/TrendingPeople';
import TrendingMovies from './Components/TrendingMovies';
import YellowButton from './Components/YellowButton';

const Home = props => {
  return (
    <ScrollView style={Styles.sectionBg}>
      <DiscoverMovies navigation={props.navigation} />
      <YellowButton />
      <TrendingMovies
        title="Trending Movies"
        url="/movie/top_rated"
        navigation={props.navigation}
        testID='TrendingMovies'
      />
      <TrendingPeople title="Trending People" url="/trending/person/week" />
      <TrendingMovies
        title="Other Movies"
        url="/movie/top_rated"
        navigation={props.navigation}
        testID='OtherMovies'
      />
    </ScrollView>
  );
};

export default Home