import {View, Text, Switch, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getSettings, sendSettings } from './Api';

console.reportErrorsAsExceptions = false;

class Settings extends React.Component {
  constructor(props) {
    super(props)
        this.state = {
            beta_button: false,
            followers_button: false,
            video_button: false,
            statut_button: false,
            mention_button: false,
            subscribe_button: false,
            isFocus: false,
            save: [],
        }
    }
  
  async componentDidMount() {
    let info = await getSettings()
    this.setState({beta_button: info.beta})
    this.setState({followers_button: info.enable_followers})
    this.setState({video_button: info.video_autoplay})
    this.setState({statut_button: info.show_presence})
    this.setState({mention_button: info.monitor_mentions})
    this.setState({subscribe_button: info.over_18})
    this.setState({save: info})
    console.log("Update")
  }

  toggleSwitchBeta = (value) => {
    this.setState({beta_button : value})
  }
  toggleSwitchFollowers = (value) => {
    this.setState({followers_button : value})
  }  
  toggleSwitchVideo = (value) => {
    this.setState({video_button : value})
  }
  toggleSwitchStatut = (value) => {
    this.setState({statut_button : value})
  }
  toggleSwitchMention = (value) => {
    this.setState({mention_button : value})
  }
  toggleSwitchSubscribe = (value) => {
    this.setState({subscribe_button : value})
  }

  async updateSettings() {
    let info = await getSettings()
    this.setState({beta_button: info.beta})
    this.setState({followers_button: info.enable_followers})
    this.setState({video_button: info.video_autoplay})
    this.setState({statut_button: info.show_presence})
    this.setState({mention_button: info.monitor_mentions})
    this.setState({subscribe_button: info.over_18})
    this.setState({save: info})
    console.log("Update 2")
  }

  saveSettings = () => {
    sendSettings(this.state.save)
  }

 render() {
  const {isFocused} = this.props;
  if (isFocused === true & this.state.isFocus === false) {
    this.updateSettings()
    this.state.isFocus = true
  }
  else if (isFocused === false & this.state.isFocus === true) {
    this.state.isFocus = false
  }
  return (
    <View style={{flex: 1, backgroundColor: '#303030'}}>
      <ScrollView>
        <TouchableOpacity style={{backgroundColor:'#FF8201', alignSelf: 'center', flexDirection: 'row', width: '90%', padding: 10, paddingBottom: 1, borderRadius: 10, marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Beta</Text>
          <Text style={{fontSize: 11, fontWeight: 'bold', padding: 10, marginTop: 15, marginStart: -45}}>Participate in beta tests</Text>
          <Switch style={{marginStart: 117}} trackColor={{true: '#2fe5da', false: 'black'}} thumbColor={[Platform.OS=='ios'?'#FFFFFF':(this.state.beta_button ?'#7ab8e1':'#ffffff')]} onValueChange={this.toggleSwitchBeta} value={this.state.beta_button}/>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:'#FF8201', alignSelf: 'center', flexDirection: 'row', width: '90%', padding: 10, paddingBottom: 1, borderRadius: 10, marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Followers</Text>
          <Text style={{fontSize: 11, fontWeight: 'bold', padding: 10, marginTop: 15, marginStart: -88}}>Allow people to follow you</Text>
          <Switch style={{marginStart: 105}} trackColor={{true: '#2fe5da', false: 'black'}} thumbColor={[Platform.OS=='ios'?'#FFFFFF':(this.state.followers_button ?'#7ab8e1':'#ffffff')]} onValueChange={this.toggleSwitchFollowers} value={this.state.followers_button}/>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:'#FF8201', alignSelf: 'center', flexDirection: 'row', width: '90%', padding: 10, paddingBottom: 1, borderRadius: 10, marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Video autoplay</Text>
          <Text style={{fontSize: 13, fontWeight: 'bold', padding: 10, marginTop: 15, marginStart: -130}}>Autoplay video and gif</Text>
          <Switch style={{marginStart: 100}} trackColor={{true: '#2fe5da', false: 'black'}} thumbColor={[Platform.OS=='ios'?'#FFFFFF':(this.state.video_button ?'#7ab8e1':'#ffffff')]} onValueChange={this.toggleSwitchVideo} value={this.state.video_button}/>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:'#FF8201', alignSelf: 'center', flexDirection: 'row', width: '90%', padding: 10, paddingBottom: 1, borderRadius: 10, marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Statut visibility</Text>
          <Text style={{fontSize: 13, fontWeight: 'bold', padding: 10, marginTop: 15, marginStart: -130}}>Show visibility on profile</Text>
          <Switch style={{marginStart: 90}} trackColor={{true: '#2fe5da', false: 'black'}} thumbColor={[Platform.OS=='ios'?'#FFFFFF':(this.state.statut_button ?'#7ab8e1':'#ffffff')]} onValueChange={this.toggleSwitchStatut} value={this.state.statut_button}/>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:'#FF8201', alignSelf: 'center', flexDirection: 'row', width: '90%', padding: 10, paddingBottom: 1, borderRadius: 10, marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Mentions of u/pseudo</Text>
          <Text style={{fontSize: 13, fontWeight: 'bold', padding: 10, marginTop: 15, marginStart: -190}}>Get notification when mention</Text>
          <Switch style={{marginStart: 60}} trackColor={{true: '#2fe5da', false: 'black'}} thumbColor={[Platform.OS=='ios'?'#FFFFFF':(this.state.mention_button ?'#7ab8e1':'#ffffff')]} onValueChange={this.toggleSwitchMention} value={this.state.mention_button}/>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:'#FF8201', alignSelf: 'center', flexDirection: 'row', width: '90%', padding: 10, paddingBottom: 1, borderRadius: 10, marginTop: 30}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>New subscriber</Text>
          <Text style={{fontSize: 13, fontWeight: 'bold', padding: 10, marginTop: 15, marginStart: -135}}>Get notification of new subscriber</Text>
          <Switch style={{marginStart: 40}} trackColor={{true: '#2fe5da', false: 'black'}} thumbColor={[Platform.OS=='ios'?'#FFFFFF':(this.state.subscribe_button ?'#7ab8e1':'#ffffff')]} onValueChange={this.toggleSwitchSubscribe} value={this.state.subscribe_button}/>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:'#42b1ab', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', width: '40%', padding: 10, borderRadius: 10, marginTop: 20}} onPress={this.saveSettings}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Save</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  )
 }
}

export default function(props) {
  const isFocused = useIsFocused();
  return <Settings {...props} isFocused={isFocused} />;
}