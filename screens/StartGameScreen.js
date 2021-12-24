import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';
import Input from '../components/Input';
import { useState } from 'react';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = (props) => {
  const [enteredValue,setEnteredValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectenNumber, setSelectedNumber] = useState()

 const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  const confirmHandler = () => {
    const chosenNumber = parseInt(enteredValue)
      if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
        Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99',
          [{text: 'Okay', style: 'destructive',
          onPress: resetHandler
        }])
        return
      }
    setConfirmed( true)
    setSelectedNumber(parseInt(enteredValue))
    setEnteredValue('')
    Keyboard.dismiss()
  }

  let confirmedOutPut;

  if (confirmed) {
    confirmedOutPut =
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>
          {selectenNumber}
        </NumberContainer>
        <Button title="START GAME" onPress={() => props.onStart(selectenNumber)} />
      </Card>
  }

  return (
    /*Keyboard.dismiss will hide the keyboard when pressed outside it on the screen, with the help of
    *TouchableWithoutFeedback component */
    <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonWrapper}>
            <View style={styles.button}>
              <Button
                title='Reset'
                color={colors.secondary}
                onPress={resetHandler} />
            </View>
            <View style={styles.button}>
              <Button
                title='Guess'
                color={colors.primary}
                onPress={confirmHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutPut}
      </View>
    </TouchableWithoutFeedback>
  )
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  title:{
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer:{
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  button:{
    width: 100
  }
})

export default StartGameScreen
