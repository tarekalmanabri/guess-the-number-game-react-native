import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randomNumber = Math.floor(Math.random() * (max - min)) + min
  if (randomNumber === exclude) {
    return
  } else {
    return randomNumber
  }
}

const GameScreen = (props) => {
  const [currentGuess , setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  )
  const [rounds, setRounds] = useState(0)
  /* referring the current number to the highest and lowest */
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const {userChoice, onGameOver} = props
  /* check if the guessed number is correct and end the game*/
  useEffect(() => {
     if (currentGuess === userChoice) {
       onGameOver(rounds)
     }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = (direction) => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
      Alert.alert('Cheating is Baaaad Mkay', "You shouldn't be cheating MKAAAY!",
        [{text: 'Sorry', style: 'cancel'}])
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    setRounds(currentRounds => currentRounds + 1)
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonWrapper} >
          <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
          <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
      </Card>
      <Button title="Restart" onPress={props.startNewGame}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
})

export default GameScreen
