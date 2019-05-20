import React, { Component } from 'react'

export default class Rooms extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         roomInput : '',
         addRoom : false
      }
      this.addRoomHandler = this.addRoomHandler.bind(this)
    }

    addRoomHandler(){
        this.setState({addRoom: !this.state.addRoom})
    }
    
  render() {
      if (!this.state.addRoom){
        return (
            <div id="rooms">
                Room:
            <select id='roomSelection' onChange = {(e)=>{this.props.setRoomName(e.target.value)}}>
            {this.props.rooms.map((room, index)=>{
                return (<option key={index} value={room}>{room}</option>)
            })}
            </select>
            <button onClick = {this.addRoomHandler}>Add Room</button>
            </div>
        )
      } else {
          return (
            <div id="rooms">
                New Room Name:
                <form id="newRoom" >
                <input onChange = {(e)=>{this.props.onChangeHandler(e, 'roomSelection')}} type="text" name="newRoom" id="newRoom"/>
                <button onClick = {(e)=>{e.preventDefault(); this.addRoomHandler();}}>add</button>
              </form>
            </div>
          )
      }

  }
}
