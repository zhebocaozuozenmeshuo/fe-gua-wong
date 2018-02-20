import React from 'react'

import './message.css'

class Message extends React.Component {
  render() {
    return (
      <div className="message-div">
        <div>Hello {this.props.name}</div>
        <div>大写 {this.props.name.toUpperCase()}</div>
      </div>
    )
  }
}

export default Message
