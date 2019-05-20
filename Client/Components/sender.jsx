import React from 'react'
const Sender = (props)=> (
    <form action="#" id="send" method="post">
    <input onChange = {(e)=>{props.onChangeHandler(e, 'messageInput')}} type="text" name="message" id="message"/>
    <input onClick = {(e)=>{e.preventDefault(); props.onSubmitHandler();}} type="submit" name="submit" className="submit" />
  </form>
)

export default Sender