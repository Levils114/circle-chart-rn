import React, { useEffect, useRef } from 'react';
import { View, Animated, TextInput, StyleSheet } from 'react-native';

import Svg, { G, Circle } from 'react-native-svg';

interface DonutProps{
   value: number;
   radius: number;
   strokeWidth: number;
   durantion: number;
   color: string;
   delay: number;
   textColor: string;
   max: number;
}

export default function Donut(props: DonutProps){
   const circleRef = useRef<any>();
   const inputRef = useRef<any>();

   const animatedValue = useRef(new Animated.Value(0)).current;

   const halfCircle = props.strokeWidth + props.radius;
   const circleCircunference = 2 * Math.PI * props.radius;

   const AnimatedCircle = Animated.createAnimatedComponent(Circle);
   const AnimatedInput = Animated.createAnimatedComponent(TextInput);

   function animation(toValue: number){
      return Animated.timing(animatedValue , {
         toValue,
         duration: props.durantion,
         delay: props.delay,
         useNativeDriver: false,
      }).start(() => {
         animation(toValue === 0 ? props.value : 0);
      });
   }

   useEffect(() => {
      animation(props.value);
      
      animatedValue.addListener((e) => {

         if(circleRef.current){ 
            const maxPercentage = (100 * e.value)/props.max;
            const strokeDashoffset = circleCircunference - (maxPercentage * circleCircunference)/100;

            circleRef.current.setNativeProps({
               strokeDashoffset,
            });
         }

         if(inputRef.current){
            inputRef.current.setNativeProps({
               text: `${Math.round(e.value)}`,
            })
         }
      });

      return () => {
         animatedValue.removeAllListeners();
      };
   }, [props.max, props.value]);

   return(
      <View>
         <Svg
            width={props.radius * 2} 
            height={props.radius * 2} 
            viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
         >
            <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
               <Circle 
                  cx="50%"
                  cy="50%"
                  stroke={props.color}
                  strokeWidth={props.strokeWidth}
                  r={props.radius}
                  strokeOpacity={0.2}
                  fill="transparent"
               />
               <AnimatedCircle
                  ref={circleRef} 
                  cx="50%"
                  cy="50%"
                  stroke={props.color}
                  strokeWidth={props.strokeWidth}
                  r={props.radius}
                  strokeOpacity={1}
                  fill="transparent"
                  strokeDasharray={circleCircunference}
                  strokeDashoffset={circleCircunference}
                  strokeLinecap="round"
               />
            </G>
         </Svg>

         <AnimatedInput 
            ref={inputRef}
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue="0"
            style={[
               StyleSheet.absoluteFill, 
               { fontSize: props.radius/2, color: props.textColor, },
               { fontWeight: 'bold', textAlign: 'center', }
            ]}
         />
      </View>
   );
}