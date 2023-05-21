import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { styles } from '../styles/CommonStyles';
import { bottomTabIcon } from '../assets/image';
import { getAvatarByUserId } from './util';

const AvatarComponent = (props) => {
  const [image, setImage] = useState('');
  useEffect(() => {
    async function getData() {
      console.log("userid friend:", props['userId']);
      const uri = await getAvatarByUserId(props['userId']);
      if (typeof uri === 'string' || uri instanceof String) {
        setImage(uri);
        console.log("set url success", image);
      }
      console.log("get uri", image, typeof uri);
    }
    getData();
  })
  return (
    image.length > 0 ? <Image
      style={styles.image}
      resizeMode="cover"
      source={{ uri: image }}
    /> :
      <Image
        style={styles.image}
        resizeMode="cover"
        source={bottomTabIcon.profile}
      />
  );
};

export default AvatarComponent;

