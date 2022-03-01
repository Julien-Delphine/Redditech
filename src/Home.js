import {View, Text, Button, TextInput, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { getSub, getSearch, getUnSub } from './Api';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible'

console.reportErrorsAsExceptions = false;

class Home extends React.Component {
  constructor(props) {
    super(props)
        this.state = {
            search : "",
            result : [],
            resultSearch : [],
            isCollapsedMysub : true,
            isCollapsedSearch : true,
            displaySub : 0,
            subToDisplay : {},
            img_link   : "",
            img_x : 0,
            img_y : 0,
            isSub : ""
        }
    }

  async componentDidMount() {
    console.log("mount")
    let info = await getSub()
    this.state.result = []
    info.data.children.forEach(element => {
      this.state.result = [...this.state.result, {elem : element}]
    });
    this.setState({isCollapsedMysub : false})
  }


  _moveView(data) {
    this.setState({displaySub : 1})
    this.setState({subToDisplay : data})
    this.setState({isSub: "Subscribe"})
    this.state.result.forEach(item => {
      if (item.elem.data.display_name == data.elem.data.display_name)  
        this.setState({isSub: "UnSubscribe"})
      }
    )
    if (data.elem.data.header_img === null || data.elem.data.header_img === undefined) {
      this.setState({img_x : 100})
      this.setState({img_y : 100})
      this.setState({img_link : "https://upload.wikimedia.org/wikipedia/fr/thumb/f/fc/Reddit-alien.png/220px-Reddit-alien.png"})
    }
    else {
      this.setState({img_x : data.elem.data.header_size[0]})
      this.setState({img_y : data.elem.data.header_size[1]})
      this.setState({img_link : data.elem.data.header_img})
      console.log("img", this.img_x)
      }
    }

  async _searchSub() {
    if (!this.state.isCollapsedSearch)
      this.setState({isCollapsedSearch : true})
    else {
      this.setState({isCollapsedSearch : false})
      let info = await getSearch(this.state.search)
      this.state.resultSearch = []
      let id = 1;
      info.data.children.forEach(element => {
        this.state.resultSearch = [...this.state.resultSearch, {id : id, elem : element}]
        id++
      });
      this.forceUpdate()
  }
  }

  _collapseur(){
    if (this.state.isCollapsedMysub)
      this.setState({isCollapsedMysub : false})
    else
      this.setState({isCollapsedMysub : true})
  }

 render() {
   switch(this.state.displaySub) {
     case 0 :
      return (
          <ScrollView style={{backgroundColor:'#303030'}}>
            <View style={{flexDirection:'row', backgroundColor:'#303030'}}>
              <TextInput style={{backgroundColor: '#42b1ab', width: '75%'}} placeholder={'Search Bar'}onChangeText={(text) => this.setState({search : text})}/>
              <TouchableOpacity style={{justifyContent: 'center', backgroundColor: '#FF8201', width: 90, height:40 ,padding: 15, borderRadius: 10, borderWidth: 5}} onPress={() => this._searchSub()}>
                <Text style={{justifyContent:'center', alignItems: 'center'}}>Search</Text>
              </TouchableOpacity>
            </View>
            <Collapsible collapsed={this.state.isCollapsedSearch}>
                <FlatList
                  data={this.state.resultSearch}
                  renderItem={({item}) => 
                    <TouchableOpacity style={{alignSelf: 'center', flexDirection: 'row',borderWidth: 5, justifyContent: 'center', backgroundColor: '#42b1ab', width: '90%', padding: 20, paddingBottom: 22, borderRadius: 10, marginTop: 2}} onPress={() => this._moveView(item)}>
                    <Text style={{flex: 1, fontSize: 40}}>{item.elem.data.display_name} </Text>
                    <Image style={{width: 60, height: 60}} source={{uri: item.elem.data.icon_img}}></Image>
                    </TouchableOpacity>
                  }
                />
            </Collapsible>
            <View  style={{backgroundColor:'#303030', justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity style={{justifyContent: 'center', backgroundColor: '#FF8201', width: 90, height:40 ,padding: 15, borderRadius: 10, borderWidth: 5}} onPress={() => this._collapseur()}>
                <Text style={{justifyContent:'center', alignItems: 'center'}}>My Sub</Text>
              </TouchableOpacity>
              </View>
                <Collapsible collapsed={this.state.isCollapsedMysub}>
                  <View style={{backgroundColor:'#303030'}}>
                  <FlatList
                    data={this.state.result}
                    renderItem={({item}) => 
                      <TouchableOpacity style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'center',backgroundColor: '#42b1ab', width: '90%', padding: 20, paddingBottom: 22, borderRadius: 10, marginTop: 2, borderWidth: 5}} onPress={() => this._moveView(item)}>
                        <Text style={{flex: 1, fontSize: 40, textAlignVertical: 'center'}}>{item.elem.data.display_name} </Text>
                        <Image style={{width: 60, height: 60}} source={{uri: item.elem.data.icon_img}}></Image>
                      </TouchableOpacity>
                    }
                  />
                  </View>
                </Collapsible>
                <View style={{backgroundColor:'#303030'}}>
                <TouchableOpacity style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'center',backgroundColor: '#FF8201', width: '50%', padding: 20, paddingBottom: 22, borderRadius: 10, marginTop: 2, borderWidth: 5}} onPress={() => this.componentDidMount()}>
                        <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>Update</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
      )
  case 1 :
    return(
      <View style={{backgroundColor:'#303030'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{borderWidth: 5, backgroundColor:'#42b1ab', flexDirection: 'row', justifyContent: 'center', width: '20%', padding: 10, paddingBottom: 5, borderRadius: 10, marginTop: 2}} onPress={() => this.setState({displaySub : 0})}>
            <Text>BACK</Text>
          </TouchableOpacity>
          <Image style={{ width: this.state.img_x, height: this.state.img_y, position: 'absolute', right: 5, top: 5,}} source={{uri: this.state.img_link}}></Image>
        </View>
        <View>
          <Text style= {{ fontSize: 50, textAlign: 'center', marginTop:this.state.img_y-50}}>{this.state.subToDisplay.elem.data.display_name}</Text>
        </View>
        <View style={{flexDirection: 'row', backgroundColor:'#303030'}}>
          <TouchableOpacity style={{borderWidth: 5, backgroundColor:'#42b1ab', flexDirection: 'column', justifyContent: 'center', width: '70%', padding: 15, paddingBottom: 22, borderRadius: 10, marginTop: 2}}>
            <Text style={{fontSize: 20}}>{this.state.subToDisplay.elem.data.title}</Text>
            <Text>{this.state.subToDisplay.elem.data.public_description}</Text>
          </TouchableOpacity>
          <View style={{backgroundColor:'#303030'}}>
            <TouchableOpacity style={{borderWidth: 5, backgroundColor:'#42b1ab', flexDirection: 'column', justifyContent: 'center', width: '100%', height:60 ,padding: 15, marginTop: 50, borderRadius: 10}}>
              <Text style={{}}>Followers :</Text>
              <Text style={{fontSize:20}}>{this.state.subToDisplay.elem.data.subscribers}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth: 5, backgroundColor:'#FF8201', flexDirection: 'column', justifyContent: 'center', width: '100%', padding: 15, paddingBottom: 22, borderRadius: 10, marginTop: 2}} onPress={() => {
              getUnSub(this.state.subToDisplay.elem.data.display_name, this.state.isSub)
              this.componentDidMount()
              if (this.state.isSub === "UnSubscibe")
                this.setState({isSub : "Subscribe"})
              else
                this.setState({isSub : "UnSubscribe"})
            }}>
              <Text style={{}}>{this.state.isSub}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  )
  }
 }
}

export default (Home)