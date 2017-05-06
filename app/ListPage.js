// 1. add cat
// 2. sharing cats for mananing together

import React, { Component } from 'react';
import {
  ListView,
  Alert,
  Button,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { fetchOwnCats } from './actions/userAction';


const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

class ListPage extends Component {

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    console.log("grimmer init MyHomeScreen");
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };

    this.props.dispatch(fetchOwnCats());

  }

  componentWillReceiveProps(newProps) {
    const cats = newProps.cats;

    //let {data, sectionIds} = this._getListViewData(nextProps.patients);


    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(cats)
    });

  }

// 其實有這些??
// https://facebook.github.io/react-native/docs/listview.html
//   _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
// https://facebook.github.io/react-native/docs/listview.html#renderrow
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <View>
                <Text>{rowData.name}</Text>
                <Button
                  onPress={onButtonPress}
                  title="Press Me"
                  accessibilityLabel="See an informative alert"
                />
              </View>
            )
            }
          }
        />
      </View>
    );
  }
}


//user下面有cat ids, 會用這些ids去要資料
// id1, value on
// id2, value on

//cat:
//1. name
//2. id ? 使用push?
//3. owners
//4. health info

const mapStateToProps = (state) => ({
  cats: state.cats,
});

export default connect(mapStateToProps)(ListPage);

// listview就用willreceive

// https://gist.github.com/christopherdro/89bc57a19ff02f061954
// http://stackoverflow.com/questions/38186114/react-native-redux-and-listview

//firebase的查尋: 就還是用loop
//http://stackoverflow.com/questions/38192711/how-to-retrieve-multiple-keys-in-firebase mm
// Yes, you are going in the right way. As written in this question firebase will pipeline your requests and you won't have to be concerned about performance and roundtrip time.

//http://stackoverflow.com/questions/38028568/look-up-an-object-by-the-key-in-firebase

//sql, 就用 where + or
// http://www.dofactory.com/sql/where-and-or-not mm

// http://stackoverflow.com/questions/4047484/selecting-with-multiple-where-conditions-on-same-column <-特別的

// http://stackoverflow.com/questions/8645773/sql-query-with-multiple-where-statements <-未深入看

//TODO: 可能firebase的sync的, 要變成singleton or 只執行一次放在App.js
console.log("List Page.js !!!!!!!!!")

// Firebase: no native array. https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html

// Firebase: array, push
//http://stackoverflow.com/questions/27124406/proper-way-to-store-values-array-like-in-firebase

// Firebae indexOn, orderByChild ,orderByValue:
// https://firebase.google.com/docs/database/security/indexing-data