import React from 'react'

const Message = (props)=>(
<div className="message">
    <div className="message">{props.message.username}: {props.message.text}</div>
  </div>
)

export default Message