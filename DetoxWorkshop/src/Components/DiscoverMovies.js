import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {GET} from '../Services/API';
import {SliderBox} from 'react-native-image-slider-box';
import {IMAGE_POSTER_URL} from '../config';

const DiscoverMovies = props => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await GET('/discover/movie');
      setMovies(response.results);

      const images = response.results.map(
        data => `${IMAGE_POSTER_URL}${data.backdrop_path}`,
      );

      let backImages = [];
      for (let i = 0; i < 10; ++i) {
        backImages = [...backImages, images[i]];
      }

      setImages(backImages);
    };

    getMovies();
  }, []);

  return (
    <View>
      <SliderBox
        images={images}
        onCurrentImagePressed={index =>
          props.navigation.navigate('movieDetails', {movieId: movies[index].id})
        }
      />
    </View>
  );
};

export default DiscoverMovies;