import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('Home');
    }, 2000); 
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Eco Solutions</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
