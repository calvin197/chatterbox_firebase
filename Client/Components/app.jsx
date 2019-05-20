import React, { Component } from 'react'
import axios from 'axios'
import Rooms from './rooms.jsx'
import Chats from './chats.jsx'
import Sender from './sender.jsx'
const firebase = require("firebase/app")
  require("firebase/database")


export default class app extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         messages : [],
         roomMessages: [],
         rooms: [],
         currUser: window.location.search.replace('?username=',''),
         roomSelection: '',
         messageInput: ''
      }
      this.setRoomName = this.setRoomName.bind(this)
      this.onChangeHandler = this.onChangeHandler.bind(this)
      this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onSubmitHandler(){
      const that = this
      axios({
        method: 'post', 
        url: 'firebase',
        data: {
          "text": that.state.messageInput,
          "roomname": that.state.roomSelection, 
          "username": that.state.currUser
        }
      })
      .then(()=>{
        console.log('success sending message!')
      })
      .catch((err)=>{
        console.log('error sending message!', err)
      })
    }

    onChangeHandler(e, key){
        this.setState({
            [key]: e.target.value
        })
    }

    setRoomName(roomSelection){
        this.setState({roomSelection})
    }

    componentDidMount(){
        let that = this; 
        firebase.initializeApp({
          apiKey: process.env.FIREBASE_APIKEY,
          authDomain: process.env.FIREBASE_AUTHDOMAIN,
          databaseURL: process.env.FIREBASE_DATABASEURL,
          projectId: process.env.FIREBASE_PROJECTID,
          storageBucket: process.env.FIREBASE_STORAGEBUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
          appId: process.env.FIREBASE_APPID
          })
        let database = firebase.database()
        let ref = database.ref('post')
            ref.on("value", function(snapshot) {
            let newPost = snapshot.val();
            let keys = Object.keys(newPost)
            if (keys.length > 0) {
              let messages = keys.map((id, index)=>{
                  let {createdBy, roomname, text, username} = newPost[id]
                 return {id, createdBy, roomname, text, username} 
              })
              messages = messages.sort(function(a,b){
                return new Date(b.createdBy) - new Date(a.createdBy);
              });
              let roomArr = [... new Set(messages.map(message=>message.roomname))];
              that.setState({
                  messages: messages,
                  rooms: roomArr,
                  roomSelection: roomArr[0]
              })
            }
          })
    }

    
  render() {
      if (this.state.messages.length === 0){
          return (        
          <div id = 'main' className="spinner">
          <img src="./spiffygif_46x46.gif" />
          </div>  )
      } else {
          if (this.state.roomSelection.length > 0){
              return (
              <div id = 'main'>
                  <h1>Chatbox</h1>
                <Rooms rooms={this.state.rooms} setRoomName = {this.setRoomName} onChangeHandler = {this.onChangeHandler}></Rooms>
                <Sender onSubmitHandler = {this.onSubmitHandler} onChangeHandler = {this.onChangeHandler}></Sender>
                <Chats roomSelection = {this.state.roomSelection} messages = {this.state.messages}></Chats>
                 
              </div>
              )
          } else {
            return (
                <div id = 'main'>
                    <h1>chatterbox</h1>
                  <Rooms rooms={this.state.rooms} setRoomName = {this.setRoomName} onChangeHandler = {this.onChangeHandler}></Rooms>  
                </div>
                )
          }
      }
  }
}

