import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

console.reportErrorsAsExceptions = false;

class Base extends React.Component {

  render() {
        return (
          <View style={{flex:1, backgroundColor:'#303030', justifyContent:'center',alignItems:'center'}}>
              <Image style={{textAlign: 'center', width: 200, height: 200}} source={{uri: "https://upload.wikimedia.org/wikipedia/fr/thumb/f/fc/Reddit-alien.png/220px-Reddit-alien.png"}}></Image>
              <TouchableOpacity style={{justifyContent: 'center', backgroundColor: '#42b1ab', width: '80%', height:130 ,padding: 15, marginTop: 50, borderRadius: 10, borderWidth: 5}}>
                <Text style={{fontSize:40, textAlign: 'center'}}>Redditech</Text>
              <Text style={{fontSize:20, textAlign: 'center'}}>Connection</Text>
              </TouchableOpacity>
            <TouchableOpacity style={{justifyContent: 'center', backgroundColor: '#FF8201', width: 75, height:40 ,padding: 15, marginTop: 50, borderRadius: 10, borderWidth: 5}} onPress={() => this.props.navigation.navigate('Web')}>
              <Text style={{}}>Login</Text>
            </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'column', justifyContent: 'center', backgroundColor: '#42b1ab', width: '80%', height:50 ,padding: 15, marginTop: 50, borderRadius: 10, borderWidth: 5}}>
                <Text style={{fontSize:10}}>Powered by</Text>
                <Text style={{fontSize:25, textAlign: 'center'}}>Julien & Moi</Text>
              </TouchableOpacity>
            </View>
        );
    }
}

export default Base