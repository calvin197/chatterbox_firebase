import React from 'react'
import Message from './message.jsx'
const Chats = (props)=>(
  <div className="chat">
    {props.messages.filter(message=>message.roomname === props.roomSelection).map((message, index)=>(
        <Message key = {index} message = {message}></Message>
    ))}
  </div>
)
export default Chats

