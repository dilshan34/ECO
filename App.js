// App.js

import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

class App extends Component {
  state = {
    url: '',
    cachedUrl: null,
  };

  componentDidMount() {
    this.loadCachedUrl();
  }

  loadCachedUrl = async () => {
    try {
      const storedUrl = await AsyncStorage.getItem('cachedUrl');
      if (storedUrl) {
        this.setState({ cachedUrl: storedUrl });
      }
    } catch (error) {
      console.error('Failed to load cached URL', error);
    }
  };

  saveUrl = async () => {
    const { url } = this.state;
    if (url) {
      try {
        await AsyncStorage.setItem('cachedUrl', url);
        this.setState({ cachedUrl: url });
      } catch (error) {
        console.error('Failed to save the URL', error);
      }
    }
  };

  handleUrlChange = (url) => {
    this.setState({ url });
  };

  render() {
    const { url, cachedUrl } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {cachedUrl ? (
          <View style={styles.webviewContainer}>
            <WebView source={{ uri: cachedUrl }} style={styles.webview} />
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter URL"
              value={url}
              onChangeText={this.handleUrlChange}
            />
            <View style={styles.button}>
              <Button title="Submit" onPress={this.saveUrl} />
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webviewContainer: {
    flex: 1,
    marginTop: 30,
  },
  webview: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '50%',
    marginHorizontal: 30,
  },
});

export default App;
