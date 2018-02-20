import React from 'react'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsElapsed: 0
    }
  }

  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }))
  }
  componentDidMount() {
    console.log('定时器组件 did mount')
    this.interval = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    console.log('定时器组件 will unmount')
    clearInterval(this.interval)
  }
  render() {
    return(
      <div>启动时间: {this.state.secondsElapsed}</div>
    )
  }
}

export default Timer
