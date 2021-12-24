import {  StyleSheet, View } from 'react-native';

const Card = (props) => {
  return(
    <View style={{...styles.card, ...props.style}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    /*shadow only works on IOS, for Android we use 'elevation' */
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 20,
  },
})

export default Card
