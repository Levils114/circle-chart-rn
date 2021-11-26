import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Donut from './src/components/donut';
import { donuts } from './src/utils/donuts';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {donuts.map(({ id, value, color, max }) => (
          <Donut 
            key={id}
            value={value}
            radius={90}
            strokeWidth={10}
            durantion={900}
            delay={200}
            color={color}
            textColor={"#000"}
            max={max}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
