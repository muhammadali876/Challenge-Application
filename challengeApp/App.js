import 'react-native-gesture-handler';
import React from 'react';
import Providers from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Providers />
    </GestureHandlerRootView>
  );
}

export default App;
