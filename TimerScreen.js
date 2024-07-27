import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the back arrow

const TimerScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(600000); // 10 minutes in milliseconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(10);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const caloriesBurnedPerMinute = 8; // Example value for calories burned per minute

  useEffect(() => {
    let timer = null;
    if (timerRunning) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setTimerRunning(false);
            return 0;
          }
          const newTime = prevTime - 1000;
          // Update calories burned as time progresses
          setCaloriesBurned(calculateCaloriesBurned(newTime));
          return newTime;
        });
      }, 1000);
    } else if (!timerRunning && timeLeft !== 600000) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(inputMinutes * 60000 + inputSeconds * 1000);
    setTimerRunning(true);
    setCaloriesBurned(calculateCaloriesBurned(inputMinutes * 60000 + inputSeconds * 1000));
  };
  
  const pauseTimer = () => setTimerRunning(false);
  
  const resetTimer = () => {
    setInputMinutes(10);
    setInputSeconds(0);
    setTimeLeft(600000);
    setTimerRunning(false);
    setCaloriesBurned(0);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const calculateCaloriesBurned = (timeInMilliseconds) => {
    const timeInMinutes = Math.floor((600000 - timeInMilliseconds) / 60000);
    return timeInMinutes * caloriesBurnedPerMinute;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Minutes</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            value={String(inputMinutes)}
            onChangeText={text => setInputMinutes(Math.max(0, parseInt(text, 10) || 0))}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Seconds</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            value={String(inputSeconds)}
            onChangeText={text => setInputSeconds(Math.max(0, parseInt(text, 10) || 0))}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!timerRunning ? (
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={pauseTimer}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.caloriesText}>
        Calories Burned: {caloriesBurned.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  iconButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  timerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000', // Timer font color set to black
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  input: {
    width: 60,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 5,
    padding: 5,
    backgroundColor: '#fff',
    color: '#000', // Input text color set to black
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  caloriesText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
});

export default TimerScreen;
