import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import { getInfo } from './Api';

console.reportErrorsAsExceptions = false;

class Profile extends React.Component {
  constructor(props) {
    super(props)
        this.state = {
            name: "*",
            description: "*",
            img: "*",
            coins: "*"
        }
    }

  async componentDidMount() {
    let info = await getInfo()
    this.setState({name: info.name})
    this.setState({description: info.description})
    this.setState({img: info.img})
    this.setState({coins: info.coins})
  }
 render() {
  return (
    <View style={{backgroundColor:'#303030'}}>
      <ScrollView>
        <View style={{padding: 10, width: '100%', backgroundColor:'#000', height:150}}>
          <TouchableOpacity>
          </TouchableOpacity>
        </View>
          <View style={{alignItems: 'center'}}>
            <Image style={{flex:4, width: 140, height: 140, marginTop: -70, borderRadius: 100}} source={{uri: this.state.img}}></Image>
            <Text style={{fontSize: 35, fontWeight: 'bold', padding: 10, color:'#42b1ab'}}>{this.state.name}</Text>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: 'grey', color:'#FF8201'}}>{this.state.description}</Text>
          </View>
          <TouchableOpacity style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black', width: '90%', padding: 20, paddingBottom: 30, borderRadius: 10, marginTop: 200}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>INSECURITE</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  )
 }
}

export default (Profile)
