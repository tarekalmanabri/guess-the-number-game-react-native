import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import { useState } from 'react';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  /* one of the ways to switch between screens is doing it conditionally like below */
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

  const startNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds)
  }

  let content = <StartGameScreen onStart={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}  startNewGame={startNewGameHandler}/>
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} startNewGame={startNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
