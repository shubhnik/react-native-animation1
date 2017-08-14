/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Dimensions,
  Easing
} from 'react-native';

import EIcon from 'react-native-vector-icons/Entypo'

const ScreenHeight = Dimensions.get('window').height

export default class removeView extends Component {

  state={
    backOpacity:1,
    showCross:false,
    showView:true,
    animation: new Animated.ValueXY(),
    crossX:0,
    crossY:0,
    crossScaleAnimation: new Animated.Value(0.8),
    viewScaleAnimation: new Animated.Value(1),
  }

  asyncCall(e, gestureState){
      //alert('hello')
    console.log("NAtiVe EvenT"+ JSON.stringify(gestureState))
    if(gestureState.moveX < 162.5 || gestureState.moveY < 607) {
        //alert("#$1")
        Animated.parallel([
            Animated.spring(
                this.state.crossScaleAnimation,
                {
                    toValue: 0.8,
                    //easing: Easing.back,
                    //tension:1
                }
            ),
            Animated.spring(
                this.state.viewScaleAnimation,
                {
                    toValue: 1,
                    //easing: Easing.back,
                    //friction:1
                }
            )
        ]).start()
    }

    if(gestureState.moveX >= 162.5 && gestureState.moveY >= 607){
      Animated.parallel([
        Animated.spring(
        this.state.crossScaleAnimation,
        {
          toValue:1.2,
          //easing: Easing.back,
          //tension:1
           restDisplacementThreshold:1
        }
      ),
      Animated.spring(
        this.state.viewScaleAnimation,
        {
          toValue:0.6,
          //easing: Easing.back,
          //friction:1,
         
        }
      )
      ]).start()
    }
   // }
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({

         onStartShouldSetPanResponder: ( e, gestureState) => {
           return true;
         },

         onMoveShouldSetResponder: (e, gestureState) => {
           return true;
         },

         onMoveShouldSetResponderCapture: () => true,

         onMoveShouldSetPanResponderCapture: () => {
           true
         },
         
         onPanResponderGrant: (e, gestureState) => {
          //console.log("********" + JSON.stringify(gestureState))
          this.setState({showCross:true,backOpacity:0.8}, () => {
            this.state.animation.setOffset({x:this.state.animation.x._value, y:this.state.animation.y._value}),
            this.state.animation.setValue({ x: 0, y: 0})
          })
        },

        onPanResponderRelease: (e, gestureState) => {
            if((gestureState.moveX > 162 && gestureState.moveX < 212) && ( gestureState.moveY > 607 && gestureState.moveY < 657)){
                this.setState({showView:false})
            }
             console.log("****PanRELeasE" + JSON.stringify(gestureState))
          this.setState({showCross:false,backOpacity:1}, () => {
            this.state.animation.flattenOffset()
          })
          
        },

        onPanResponderMove: Animated.event([
          null, 
          {dx: this.state.animation.x, dy: this.state.animation.y, useNativeDriver:true}
        ], {listener: this.asyncCall.bind(this)})
        })
  }

  
  render() {
    return (
      <View style={{flex:1,alignItems:'center',backgroundColor:'indigo',opacity:this.state.backOpacity}}>
          { this.state.showView ?
        <Animated.View 
          style={{zIndex:100,height:60,position:'absolute',width:60,borderRadius:30,backgroundColor:'yellowgreen',transform:[{translateX:this.state.animation.x},{translateY:this.state.animation.y},{scaleX:this.state.viewScaleAnimation},{scaleY:this.state.viewScaleAnimation}]}} 
          { ...this._panResponder.panHandlers }
        /> : null}
        { this.state.showCross ?
        <Animated.View 
          style={{height:50, width:50, borderRadius:25, position:'absolute',marginTop:ScreenHeight-60,transform:[{scaleX:this.state.crossScaleAnimation},{scaleY:this.state.crossScaleAnimation}]}}
          onLayout={(e)=>console.log("******"+JSON.stringify(e.nativeEvent))}
        >
            <EIcon name='circle-with-cross' size={50} style={{color:'white'}}/>
        </Animated.View> : null }
      </View>
    )
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('removeView', () => removeView);
