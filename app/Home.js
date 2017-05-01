import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { connectDBtoCheckUser } from './actions/userAction';

import Login from './Login';
import MainScreen from './MainScreen';

class Home extends Component {

  constructor(props) {
     super(props);

     // 3 ways to dispatch action
     //1. bind action
     //2. map dispatch
     //3.  directly use dispatch
     this.props.dispatch(connectDBtoCheckUser());

    // initial actions in constructor vs in componentDidMount
    // https://discuss.reactjs.org/t/constructor-vs-componentwillmount-vs-componentdidmount/4287
    // Actually, the rule is: If your initialization depends upon the DOM, use componentDidMount, otherwise use constructor.

  }

  render() {
    const {userChecking, user} = this.props;
    console.log("user,checking:",this.props);
    if (userChecking) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Loading...
          </Text>
        </View>
      );
    }

    if (user && user.maoID){
      return <MainScreen/>;
    } else {
      return <Login/>;
    }

  }
}

const styles = StyleSheet.create({
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
});

function debugState(state){

  console.log("state:", state);
  return state.user
}

const mapStateToProps = (state) => ({
  user: debugState(state),
  userChecking: state.userChecking,
});

export default connect(mapStateToProps)(Home);